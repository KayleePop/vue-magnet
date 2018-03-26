let WebTorrent = require('webtorrent')
let idbStore = require('indexeddb-chunk-store')

let VueMagnet = {
  install (Vue, options) {
    Vue.WebTorrent = Vue.WebTorrent || new WebTorrent()
    if (options && options.magnetLink) {
      Vue.WebTorrent.add(options.magnetLink, {store: idbStore})
    }

    Vue.directive('magnet', (el, binding, vnode) => {
      if (binding.value === binding.oldValue) return

      let client = Vue.WebTorrent

      let magnetLink
      let path
      if (options && options.magnetLink) {
        magnetLink = options.magnetLink
        path = binding.value
      } else {
        let pathRegex = /&path=([^&]+)/
        let pathSearch = pathRegex.exec(binding.value)
        path = (pathSearch && 1 in pathSearch) ? pathSearch[1] : '' // default path is matching everything
        magnetLink = binding.value.replace(pathRegex, '')
      }

      let existingTorrent = client.get(magnetLink) // null if it doesn't exist

      if (existingTorrent) {
        // make sure metadata is available before path matching
        if (existingTorrent.files.length > 0) {
          renderFile(existingTorrent)
        } else {
          existingTorrent.on('ready', () => renderFile(existingTorrent))
        }
      } else {
        client.add(magnetLink, { store: idbStore }, renderFile)
      }

      function renderFile (torrent) {
        // only render the first file found matching the path exactly
        let fileToRender = torrent.files.find((file) => {
          if (!path) return true // if no path is specified, render the first file

          // only set rootDir if the file in in a directory
          let rootDir = /\//.test(file.path) ? (torrent.name + '/') : ''

          path = path.replace(/^\//, '') // remove initial / if present

          return file.path === rootDir + path
        })

        if (!fileToRender) {
          throw new Error('No file found matching this path: ' + path)
        }

        fileToRender.renderTo(el, {
          autoplay: false, controls: false // stops any overwrite of the element's values
        }, (err, elem) => {
          if (err) throw err
          el.dispatchEvent(new CustomEvent('magnet-loaded')) // eslint-disable-line
        })
      }
    })
  }
}

if (window.Vue) window.Vue.use(VueMagnet)

export default VueMagnet

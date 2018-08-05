let WebTorrent = require('webtorrent')

let VueMagnet = {
  install (Vue, options = {}) {
    Vue.WebTorrent = Vue.WebTorrent || new WebTorrent()
    if (options.magnetLink) {
      Vue.WebTorrent.add(options.magnetLink)
    }

    Vue.directive('magnet', (el, binding, vnode) => {
      if (binding.value === binding.oldValue) return

      let client = Vue.WebTorrent

      let magnetLink
      let path
      if (options.magnetLink) {
        magnetLink = options.magnetLink
        path = binding.value
      } else {
        let pathRegex = /&path=([^&]+)/
        let pathSearch = pathRegex.exec(binding.value)
        path = (pathSearch && 1 in pathSearch) ? pathSearch[1] : '' // default path is matching everything
        magnetLink = binding.value.replace(pathRegex, '')
      }

      let torrent = client.get(magnetLink) || client.add(magnetLink)

      // make sure metadata is available before path matching
      if (torrent.metadata) {
        renderFile(torrent)
      } else {
        torrent.on('ready', () => renderFile(torrent))
      }

      function renderFile (torrent) {
        // only render the first file found matching the path exactly
        let fileToRender = torrent.files.find((file) => {
          if (!path) return true // if no path is specified, render the first file

          // only set rootDir if the file is in a directory
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
          el.dispatchEvent(new window.CustomEvent('magnet-loaded'))
        })
      }
    })
  }
}

if (window.Vue) window.Vue.use(VueMagnet)

module.exports = VueMagnet

const Vue = require('vue')
const WebTorrent = require('webtorrent')

module.exports = {
  createAppDiv () {
    let previousAppElement = document.querySelector('#app')
    if (previousAppElement) {
      previousAppElement.remove()
    }
    let appElement = document.createElement('div')
    appElement.setAttribute('id', 'app')
    document.body.appendChild(appElement)
  },
  cleanUp (vm) {
    vm.$el.remove()
    vm.$destroy()

    if (Vue.WebTorrent) {
      Vue.WebTorrent.torrents[0].store.destroy()
      Vue.WebTorrent.destroy()
      Vue.WebTorrent = new WebTorrent()
    }
  }
}

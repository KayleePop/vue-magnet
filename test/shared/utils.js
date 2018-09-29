const Vue = require('vue')
const WebTorrent = require('webtorrent')

function clearDOM () {
  document.body.innerHTML = ''
}

module.exports = {
  prepareDOM () {
    clearDOM()

    let appElement = document.createElement('div')
    appElement.setAttribute('id', 'app')
    document.body.appendChild(appElement)
  },
  resetWebtorrent () {
    if (Vue.WebTorrent) {
      Vue.WebTorrent.torrents[0].store.destroy()
      Vue.WebTorrent.destroy()
      Vue.WebTorrent = new WebTorrent()
    }
  }
}

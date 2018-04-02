import MagnetDefinedOnInstallComponent from './magnetDefinedOnInstall.vue'
import loadjs from 'loadjs'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('Defining a magnet link on install should still correctly load files', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(2 * 60 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet, {magnetLink: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'})

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(MagnetDefinedOnInstallComponent, { on: { finished () {
        t.pass()
      }}})
    })
  })
})

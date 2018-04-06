const MultipleTestComponent = require('./MultipleFilesFromSameTorrent.vue')
const loadjs = require('loadjs')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('multiple files from the same torrent shouldn\'t throw an error', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(MultipleTestComponent, { on: { finished () {
        t.pass()
      }}})
    })
  })
})

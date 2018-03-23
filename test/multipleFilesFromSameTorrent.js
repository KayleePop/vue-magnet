import MultipleTestComponent from './MultipleFilesFromSameTorrent.vue'
import Vue from 'vue'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('multiple files from the same torrent shouldn\'t throw an error', (t) => {
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10000)

  Vue.config.errorHandler = (err) => t.fail(err.message)

  Vue.use(VueMagnet)

  let vm = new Vue({
    el: '#app',
    render: (h) => h(MultipleTestComponent, { on: { finished () {
      t.pass()
      utils.cleanUpVue(vm)
    }}})
  })
})

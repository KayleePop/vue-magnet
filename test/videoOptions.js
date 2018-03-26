import VideoOptionsComponent from './videoOptions.vue'
import Vue from 'vue'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('video tag\'s settings shouldn\'t be overwritten', (t) => {
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(2 * 60 * 1000)

  Vue.config.errorHandler = (err) => t.fail(err.message)

  Vue.use(VueMagnet)

  let vm = new Vue({
    el: '#app',
    render: (h) => h(VideoOptionsComponent, { on: { correct () {
      t.pass()
      utils.cleanUpVue(vm)
    }}})
  })
})

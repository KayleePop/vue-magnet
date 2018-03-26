import RebindComponent from './rebind.vue'
import Vue from 'vue'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('rebinding the magnet link should correctly load the new image', (t) => {
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(2 * 60 * 1000)

  Vue.config.errorHandler = (err) => t.fail(err.message)

  Vue.use(VueMagnet)

  let vm = new Vue({
    el: '#app',
    render: (h) => h(RebindComponent, { on: { success () {
      t.pass()
      utils.cleanUpVue(vm)
    }}})
  })
})

import PathErrorComponent from './pathError.vue'
import Vue from 'vue'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('specifying an invalid path should throw an error', (t) => {
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10000)

  Vue.use(VueMagnet)

  Vue.config.errorHandler = (err) => t.equals(err.message, 'No file found matching this path: invalid')

  window.onerror = (msg) => {
    utils.cleanUpVue(vm)
    t.true(msg.includes('No file found matching this path: invalid'), 'error message should match expected')
  }

  let vm = new Vue({
    el: '#app',
    render: (h) => h(PathErrorComponent, { on: { success () {
      t.fail('invalid path should throw an error')
    }}})
  })
})

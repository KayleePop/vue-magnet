import PathErrorComponent from './pathError.vue'
import loadjs from 'loadjs'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('specifying an invalid path should throw an error', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1) // either the vue error or the window error
  t.timeoutAfter(2 * 60 * 1000)

  window.onerror = (msg) => t.true(msg.includes('No file found matching this path: invalid'))

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.equals(err.message, 'No file found matching this path: invalid')

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(PathErrorComponent, { on: { success () {
        t.fail('invalid path should throw an error')
      }}})
    })
  })
})

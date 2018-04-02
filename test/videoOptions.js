import VideoOptionsComponent from './videoOptions.vue'
import loadjs from 'loadjs'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('video tag\'s settings shouldn\'t be overwritten', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(2 * 60 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(VideoOptionsComponent, { on: { correct () {
        t.pass()
      }}})
    })
  })
})

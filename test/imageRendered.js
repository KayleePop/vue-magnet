import ImageRenderedComponent from './imageRendered.vue'
import loadjs from 'loadjs'
import VueMagnet from '../vue-magnet.js'
import test from 'tape'
import utils from './shared/utils.js'

test('image should be rendered correctly', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(2 * 60 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(ImageRenderedComponent, { on: { equal () {
        t.pass()
      }}})
    })
  })
})

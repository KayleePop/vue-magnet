const ImageRenderedComponent = require('./imageRendered.vue')
const loadjs = require('loadjs')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('image should be rendered correctly', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

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

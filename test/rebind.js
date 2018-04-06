const RebindComponent = require('./rebind.vue')
const loadjs = require('loadjs')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('rebinding the magnet link should correctly load the new image', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(20 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(RebindComponent, { on: { success () {
        t.pass()
      }}})
    })
  })
})

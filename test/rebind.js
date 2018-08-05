const RebindComponent = require('./rebind.vue')
const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('rebinding the magnet link should correctly load the new image', (t) => {
  utils.createAppDiv()

  t.plan(1)

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(RebindComponent, { on: { success () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })

  Vue.config.errorHandler = (err) => {
    t.fail(err.message)
    utils.cleanUp(vm)
  }
})

const PathErrorComponent = require('./pathError.vue')
const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('specifying an invalid path should throw an error', (t) => {
  utils.createAppDiv()

  t.plan(1) // either the vue error or the window error

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(PathErrorComponent, { on: { success () {
      t.fail('invalid path should throw an error')
      utils.cleanUp(vm)
    }}})
  })

  window.onerror = (msg) => {
    t.true(msg.includes('No file found matching this path: invalid'))
    utils.cleanUp(vm)
  }

  Vue.config.errorHandler = (err) => {
    t.equals(err.message, 'No file found matching this path: invalid')
    utils.cleanUp(vm)
  }
})

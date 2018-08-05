const MagnetDefinedOnInstallComponent = require('./magnetDefinedOnInstall.vue')
const Vue = require('vue')
const VueMagnet = require('../../vue-magnet.js')
const test = require('tape')
const utils = require('../shared/utils.js')
const magnetLink = require('../shared/magnetLink.js')

test('Defining a magnet link on install should still correctly load files', (t) => {
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

  Vue.use(VueMagnet, {magnetLink: magnetLink})

  Vue.config.errorHandler = (err) => t.fail(err.message)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(MagnetDefinedOnInstallComponent, { on: { finished () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })
})

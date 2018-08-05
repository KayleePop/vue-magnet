const MultipleTestComponent = require('./MultipleFilesFromSameTorrent.vue')
const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('multiple files from the same torrent shouldn\'t throw an error', (t) => {
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

  Vue.use(VueMagnet)

  Vue.config.errorHandler = (err) => t.fail(err.message)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(MultipleTestComponent, { on: { finished () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })
})

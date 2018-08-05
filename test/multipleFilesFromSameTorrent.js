const MultipleTestComponent = require('./MultipleFilesFromSameTorrent.vue')
const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('multiple files from the same torrent shouldn\'t throw an error', (t) => {
  utils.createAppDiv()

  t.plan(1)

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(MultipleTestComponent, { on: { finished () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })
})

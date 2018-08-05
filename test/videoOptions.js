const AutoplayComponent = require('./videoOptions/autoplay.vue')
const ControlsComponent = require('./videoOptions/controls.vue')
const BothComponent = require('./videoOptions/both.vue')
const NeitherComponent = require('./videoOptions/neither.vue')
const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('autoplay property should work', (t) => {
  utils.createAppDiv()

  t.plan(1)

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(AutoplayComponent, { on: { success () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })
})

test('controls property should work', (t) => {
  utils.createAppDiv()

  t.plan(1)

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(ControlsComponent, { on: { success () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })
})

test('both autoplay and controls together should work', (t) => {
  utils.createAppDiv()

  t.plan(1)

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(BothComponent, { on: { success () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })
})

test('neither autoplay and controls should work', (t) => {
  utils.createAppDiv()

  t.plan(1)

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(NeitherComponent, { on: { success () {
      t.pass()
      utils.cleanUp(vm)
    }}})
  })
})

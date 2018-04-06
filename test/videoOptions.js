const AutoplayComponent = require('./videoOptions/autoplay.vue')
const ControlsComponent = require('./videoOptions/controls.vue')
const BothComponent = require('./videoOptions/both.vue')
const NeitherComponent = require('./videoOptions/neither.vue')
const loadjs = require('loadjs')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('autoplay property should work', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(AutoplayComponent, { on: { success () {
        t.pass()
      }}})
    })
  })
})

test('controls property should work', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(ControlsComponent, { on: { success () {
        t.pass()
      }}})
    })
  })
})

test('both autoplay and controls together should work', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(BothComponent, { on: { success () {
        t.pass()
      }}})
    })
  })
})

test('neither autoplay and controls should work', (t) => {
  utils.cleanUp()
  utils.createAppDiv()

  t.plan(1)
  t.timeoutAfter(10 * 1000)

  loadjs('https://vuejs.org/js/vue.js', () => {
    window.Vue.use(VueMagnet)

    window.Vue.config.errorHandler = (err) => t.fail(err.message)

    window.vueInstance = new window.Vue({
      el: '#app',
      render: (h) => h(NeitherComponent, { on: { success () {
        t.pass()
      }}})
    })
  })
})

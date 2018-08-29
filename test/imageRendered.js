const ImageRenderedComponent = require('./imageRendered.vue')
const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('tape')
const utils = require('./shared/utils.js')

test('image should be rendered correctly', (t) => {
  utils.createAppDiv()

  t.plan(1)

  Vue.use(VueMagnet)

  const vm = new Vue({
    el: '#app',
    render: (h) => h(ImageRenderedComponent, {
      on: {
        equal () {
          t.pass()
          utils.cleanUp(vm)
        }
      }
    })
  })
})

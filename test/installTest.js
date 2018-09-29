const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('muggle-test')
const utils = require('./shared/utils.js')
const magnetLink = require('./shared/magnetLink.js')

test('Defining a magnet link on install should still correctly load files', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet, { magnetLink: magnetLink })

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./magnetDefinedOnInstall.vue'))
    })
  })

  vm.$destroy()
})

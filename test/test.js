const Vue = require('vue')
const VueMagnet = require('../vue-magnet.js')
const test = require('muggle-test')
const assert = require('muggle-assert')
const utils = require('./shared/utils.js')
const md5Hash = require('md5-hex')

function sleep (delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

test('image should be rendered correctly', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./imageRendered.vue'))
    })
  })

  const posterImg = document.getElementById('posterImg')
  const response = await window.fetch(posterImg.src)
  assert(response.status, 'poster should be fetched from blobUrl successfully')

  let poster = await response.arrayBuffer()
  // this magic number is from running the hash on poster.jpg previously
  assert.equal(md5Hash(poster), 'd41d8cd98f00b204e9800998ecf8427e', 'loaded poster should match hash')

  vm.$destroy()
})

test(`multiple files from the same torrent shouldn't throw an error`, async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./multipleFilesFromSameTorrent.vue'))
    })
  })

  vm.$destroy()
})

test('specifying an invalid path should throw an error', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await assert.rejects(
    new Promise((resolve, reject) => {
      window.onerror = (message, source, lineno, colno, error) => {
        reject(error)
      }

      vm = new Vue({
        el: '#app',
        data: { resolve },
        render: (h) => h(require('./pathError.vue'))
      })
    }),
    new Error('No file found matching this path: invalid')
  )

  vm.$destroy()
})

test('rebinding the magnet link should correctly load the new image', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./rebind.vue'))
    })
  })

  vm.$destroy()
})

test('autoplay property should work', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./videoOptions/autoplay.vue'))
    })
  })

  const videoElem = document.getElementById('autoplayVideo')
  assert(videoElem.autoplay, 'autoplay should be set')
  assert(!videoElem.controls, 'controls should not be set')

  await sleep(10) // wait for video to start
  assert(!videoElem.paused, 'video should be playing')

  vm.$destroy()
})

test('controls property should work', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./videoOptions/controls.vue'))
    })
  })

  const videoElem = document.getElementById('controlsVideo')
  assert(!videoElem.autoplay, 'autoplay should not be set')
  assert(videoElem.controls, 'controls should be set')

  await sleep(10) // wait for video to start
  assert(videoElem.paused, 'video should not be playing')

  vm.$destroy()
})

test('both autoplay and controls together should work', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./videoOptions/both.vue'))
    })
  })

  const videoElem = document.getElementById('bothVideo')
  assert(videoElem.autoplay, 'autoplay should be set')
  assert(videoElem.controls, 'controls should be set')

  await sleep(10) // wait for video to start
  assert(!videoElem.paused, 'video should be playing')

  vm.$destroy()
})

test('autoplay and controls both unset should work', async () => {
  utils.prepareDOM()
  utils.resetWebtorrent()

  Vue.use(VueMagnet)

  let vm
  await new Promise((resolve, reject) => {
    vm = new Vue({
      el: '#app',
      data: { resolve },
      render: (h) => h(require('./videoOptions/neither.vue'))
    })
  })

  const videoElem = document.getElementById('neitherVideo')
  assert(!videoElem.autoplay, 'autoplay should not be set')
  assert(!videoElem.controls, 'controls should not be set')

  await sleep(10) // wait for video to start
  assert(videoElem.paused, 'video should not be playing')

  vm.$destroy()
})

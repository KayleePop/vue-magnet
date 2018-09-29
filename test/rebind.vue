<template>
  <div>
    <img v-magnet="magnetLink + path" @magnet-loaded="onLoad()"></img>
  </div>
</template>

<script>
const magnetLink = require('./shared/magnetLink.js')
module.exports = {
  data () {
    return {
      magnetLink: magnetLink,
      path: '&path=poster.jpg'
    }
  },
  methods: {
    onLoad () {
      if (this.path === '&path=poster.jpg') {
        this.path = '&path=space.jpg'
      } else {
        this.$parent.resolve()
      }
    }
  }
}
</script>

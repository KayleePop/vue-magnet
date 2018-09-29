<template>
  <div>
    <video id="neitherVideo" v-magnet="magnetLink" @magnet-loaded="resolve()"></video>
  </div>
</template>

<script>
const magnetLink = require('../shared/magnetLink.js')

module.exports = {
  data () {
    return {
      magnetLink: magnetLink + '&path=cat.webm'
    }
  },
  methods: {
    resolve () {
      this.$parent.resolve()
    }
  }
}
</script>

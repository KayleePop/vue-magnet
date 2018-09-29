<template>
  <div>
    <video id="controlsVideo" v-magnet="magnetLink" @magnet-loaded="resolve()" controls></video>
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

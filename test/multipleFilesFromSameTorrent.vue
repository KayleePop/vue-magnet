<template>
  <div>
    <img v-magnet="magnetLink + '&path=poster.jpg'" @magnet-loaded="loaded()"></img>
    <video v-magnet="magnetLink + '&path=cat.webm'" @magnet-loaded="loaded()"></video>
  </div>
</template>

<script>
const magnetLink = require('./shared/magnetLink.js')
module.exports = {
  data () {
    return {
      magnetLink: magnetLink,
      numLoaded: 0
    }
  },
  methods: {
    loaded: function () {
      this.numLoaded++
      if (this.numLoaded >= 2) {
        this.$parent.resolve()
      }
    }
  }
}
</script>

<template>
  <div>
    <img id="posterImg" v-magnet="magnetLink + '&path=poster.jpg'" @magnet-loaded="resolve()"></img>
  </div>
</template>

<script>
const magnetLink = require('./shared/magnetLink.js')

module.exports = {
  data () {
    return {
      magnetLink: magnetLink
    }
  },
  methods: {
    resolve () {
      // resolve awaited promise in test
      this.$parent.resolve()
    }
  }
}
</script>

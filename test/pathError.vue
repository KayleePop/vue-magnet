<template>
  <div>
    <img v-magnet="magnetLink + '&path=invalid'" @magnet-loaded="success()"></img>
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
    success () {
      this.$emit('success')
    }
  }
}
</script>

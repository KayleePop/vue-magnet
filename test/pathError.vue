<template>
  <div>
    <img v-magnet="magnetLink + '&path=invalid'" @magnet-loaded="resolve()"></img>
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
      this.$parent.resolve()
    }
  }
}
</script>

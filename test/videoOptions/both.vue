<template>
  <div>
    <video v-magnet="magnetLink" @magnet-loaded="check($event)" controls autoplay></video>
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
    check (event) {
      let elem = event.currentTarget

      if (elem.autoplay && !elem.paused && elem.controls) {
        this.$emit('success')
      } else {
        throw new Error('incorrect video tag settings')
      }
    }
  }
}
</script>

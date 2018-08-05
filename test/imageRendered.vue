<template>
  <div>
    <img v-magnet="magnetLink + '&path=poster.jpg'" @magnet-loaded="compare($event)"></img>
  </div>
</template>

<script>
const magnetLink = require('./shared/magnetLink.js')
const hash = require('md5-hex')

module.exports = {
  data () {
    return {
      magnetLink: magnetLink
    }
  },
  methods: {
    compare (event) {
      let posterBlobUrl = event.currentTarget.src
      let xhr = new window.XMLHttpRequest()
      let self = this

      xhr.open('GET', posterBlobUrl, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function () {
        if (this.status === 200) {
          let poster = this.response
          // this magic number is from running the hash on poster.jpg previously
          if (hash(poster) === 'd41d8cd98f00b204e9800998ecf8427e') {
            self.$emit('equal')
          } else {
            throw new Error('loaded image does not match reference')
          }
        } else {
          throw new Error('error loading poster.jpeg')
        }
      }

      xhr.onError = function () {
        throw new Error('error loading poster.jpeg')
      }

      xhr.send()
    }
  }
}
</script>

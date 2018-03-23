<template>
  <div>
    <img v-magnet="sintelMagnet" @magnet-loaded="compare($event)"></img>
  </div>
</template>

<script>
import hash from 'md5-hex'

export default {
  data () {
    return {
      sintelMagnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent&path=poster.jpg'
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

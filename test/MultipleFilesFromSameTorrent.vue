<template>
  <div>
    <img v-for="n in 3" v-magnet="sintelMagnet + '&path=poster.jpg'" @magnet-loaded="loaded()"></img>
    <video v-for="n in 2" v-magnet="sintelMagnet + '&path=Sintel.mp4'" @magnet-loaded="loaded()" controls></video>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      sintelMagnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
      numLoaded: 0
    }
  },
  methods: {
    loaded: function () {
      this.numLoaded++
      if (this.numLoaded >= 5) {
        this.$emit('finished')
      }
    }
  }
}
</script>

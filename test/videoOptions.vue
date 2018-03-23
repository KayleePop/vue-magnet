<template>
  <div>
    <video v-magnet="sintelMagnet" @magnet-loaded="neither($event)"></video>
    <video v-magnet="sintelMagnet" @magnet-loaded="controls($event)" controls></video>
    <video v-magnet="sintelMagnet" @magnet-loaded="autoplay($event)" autoplay></video>
    <video v-magnet="sintelMagnet" @magnet-loaded="both($event)" controls autoplay></video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sintelMagnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent&path=Sintel.mp4',
      numCorrect: 0,
      error: new Error('incorrect video tag settings')
    }
  },
  methods: {
    isAutoplay (event) {
      return event.currentTarget.autoplay
    },
    isControls (event) {
      return event.currentTarget.controls
    },
    addCorrect () {
      this.numCorrect++
      if (this.numCorrect >= 4) this.$emit('correct')
    },
    neither (event) {
      if (!this.isAutoplay(event) && !this.isControls(event)) {
        this.addCorrect()
      } else {
        throw this.error
      }
    },
    autoplay (event) {
      if (this.isAutoplay(event) && !this.isControls(event)) {
        this.addCorrect()
      } else {
        throw this.error
      }
    },
    controls (event) {
      if (!this.isAutoplay(event) && this.isControls(event)) {
        this.addCorrect()
      } else {
        throw this.error
      }
    },
    both (event) {
      if (this.isAutoplay(event) && this.isControls(event)) {
        this.addCorrect()
      } else {
        throw this.error
      }
    }
  }
}
</script>

<template>
  <div>
    <img v-magnet="'poster.jpg'" @magnet-loaded="loaded()"></img>
    <video v-magnet="'Sintel.mp4'" @magnet-loaded="loaded()" controls></video>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      numLoaded: 0
    }
  },
  methods: {
    loaded: function () {
      this.numLoaded++
      if (this.numLoaded >= 2) {
        this.$emit('finished')
      }
    }
  }
}
</script>

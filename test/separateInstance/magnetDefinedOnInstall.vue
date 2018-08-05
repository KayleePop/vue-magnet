<template>
  <div>
    <img v-magnet="'poster.jpg'" @magnet-loaded="loaded()"></img>
  </div>
</template>

<script>
module.exports = {
  methods: {
    loaded: function () {
      this.$emit('finished')
    }
  }
}
</script>

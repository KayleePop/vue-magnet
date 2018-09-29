<template>
  <div>
    <img v-magnet="'poster.jpg'" @magnet-loaded="resolve()"></img>
  </div>
</template>

<script>
module.exports = {
  methods: {
    resolve () {
      this.$parent.resolve()
    }
  }
}
</script>

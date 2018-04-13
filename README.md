# vue-magnet

[![Greenkeeper badge](https://badges.greenkeeper.io/KayleePop/vue-magnet.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/KayleePop/vue-magnet.svg?branch=master)](https://travis-ci.org/KayleePop/vue-magnet)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/v/vue-magnet.svg)](https://www.npmjs.com/package/vue-magnet)

Adds the magnet directive which acts like src, but uses torrent magnet links instead of http.
Works with `<video>`, `<img>`, `<audio>` tags and more.

Streams large video and audio files before they are fully downloaded.

## Install
`npm install vue-magnet`
``` javascript
const VueMagnet = require('vue-magnet')

Vue.use(VueMagnet)
```
or use a script tag to include the minified build
``` html
<script src="https://vuejs.org/js/vue.js"></script>
<!-- Make sure to place it after Vue -->
<script src="https://cdn.rawgit.com/KayleePop/vue-magnet/eb6e2ab2/vue-magnet.min.js"></script>
```
The minified script will automatically call `window.Vue.use(VueMagnet)`, so you can start using v-magnet immediately.

A WebTorrent Client instance is created as the global Vue property `Vue.WebTorrent`.
If `Vue.WebTorrent` already exists before VueMagnet is installed, then VueMagnet will use the existing instance.

## Usage
``` html
<script>
new Vue({
  el: '#app',
  data: {
    spaceImageMagnetLink:  'magnet:?xt=urn:btih:2e95238d08ef2cc462e8eeb215b5f0f093b1b205&dn=space.jpg&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
  },
  methods: {
    logic: function () {
      //logic for after image is loaded
    }
  }
})
</script>
<div id="app">
  <img v-magnet="spaceImageMagnetLink"
  @magnet-loaded="logic()"></img>
</div>
```
A new `&path=` query param in the magnet link is supported to specify a specific file in a multi-file torrent

``` html
<script>
new Vue({
  el: 'img',
  data: {
    // magnet link to torrent with a video file, subtitle files, and a poster image file named poster.jpg
    sintelMagnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
  }
})
</script>
<img v-magnet="sintelMagnet + '&path=poster.jpg'"></img>
```
A magnet link can be defined on install as well.
``` javascript
const VueMagnet = require('vue-magnet')

Vue.use(VueMagnet, { magnetLink: sintelMagnet })
```

## How it works
This plugin is a declarative and Vue compatible API for WebTorrent's `file.renderTo()` function [documented here](https://webtorrent.io/docs)

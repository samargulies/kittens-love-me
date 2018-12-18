<template>
<transition name="bubble">
  <div class="kitten-video" :style="style">
    <!-- <h3>{{video.title}}</h3> -->
    <youtube
      :video-id="videoId"
      :player-vars="playerSettings"
      @ended="close"
      player-width="300"
      player-height="169"
      mute="true"
      />
    <a @click.prevent="close">Close</a>
  </div>
</transition>
</template>

<script>

export default {
  props: {
    videoId: {
      type: String,
      required: true,
    },
  },
  computed: {
    video() {
      return this.$store.state.videos[this.videoId];
    },
    playerSettings() {
      return {
        start: 0,
        autoplay: 1,
        end: this.$store.state.preferences.playbackFor,
        controls: 0,
        fs: 0,
        playsinline: 1,
        rel: 0,
      };
    },
    style() {
      return {
        left: `${Math.floor(Math.random() * 80) + 10}%`,
      };
    },
  },
  methods: {
    close() {
      this.$store.dispatch('updateVideoFinishedPlaying', { videoId: this.videoId });
    },
  },
};
</script>

<style >
</style>

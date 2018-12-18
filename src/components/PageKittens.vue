<template>
<div class="page-kittens">
  <KittenVideo v-for="video in videos" :key="video.id" :videoId="video.id" />
</div>
</template>

<script>
import KittenVideo from '@/components/KittenVideo.vue';

export default {
  components: { KittenVideo },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    videos() {
      return this.$store.getters.activeVideos;
    },
  },
  beforeCreate() {
    this.$store.dispatch('fetchVideos')
      .then(() => this.$store.dispatch('displayNewVideo'));
  },
  created() {
    this.timer = setInterval(() => {
      this.$store.dispatch('displayNewVideo');
    }, this.$store.state.preferences.newVideoSpawn * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style >
</style>

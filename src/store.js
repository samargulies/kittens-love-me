import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: {},
    nextPageToken: null,
    activeVideo: null,
    isFullscreen: false,
    preferences: {
      playbackFor: 15,
      newVideoSpawn: 4,
    },
    favoriteVideos: {},
  },
  getters: {
    activeVideos(state) {
      return Object.values(state.videos).filter(video => video.isSeen && !video.isFinishedPlaying);
    },
    unseenVideos(state) {
      return Object.values(state.videos).filter(video => !video.isSeen);
    },
  },
  actions: {
    fetchVideos({ state, commit }) {
      const requestSettings = { params: { nextPageToken: state.nextPageToken } };
      console.log(requestSettings);
      return axios.get(config.youtubeSearchRequest, requestSettings)
        .then((response) => {
          console.log(response);
          commit('setNextPageToken', { nextPageToken: response.data.nextPageToken });
          const newVideos = response.data.items.map(video => ({
            id: video.id.videoId,
            title: video.snippet.title,
          }));
          newVideos.map(video => commit('setVideo', { video }));
          return newVideos;
        });
    },
    displayNewVideo({ getters, dispatch, commit }) {
      if (getters.unseenVideos.length < 5) {
        // fetch more videos if there are not a lot left
        dispatch('fetchVideos').then(() => dispatch('displayNewVideo'));
      } else {
      // display the next video
        const nextVideo = getters.unseenVideos[0].id;
        console.log('🐈 adding new video', nextVideo);
        commit('setVideoSeen', { videoId: nextVideo, isSeen: true });
      }
    },
    updateActiveVideo({ commit }, { videoId }) {
      commit('setActiveVideo', videoId);
    },
    updateVideoFinishedPlaying({ commit }, { videoId }) {
      commit('setVideoFinishedPlaying', { videoId, isFinishedPlaying: true });
    },
    updateIsFullscreen() {

    },
    setFavoriteVideo() {

    },
  },
  mutations: {
    setVideo(state, { video }) {
      Vue.set(state.videos, video.id, video);
    },
    setVideoFinishedPlaying(state, { videoId, isFinishedPlaying }) {
      const video = { ...state.videos[videoId], isFinishedPlaying };
      Vue.set(state.videos, videoId, video);
    },
    setVideoSeen(state, { videoId, isSeen }) {
      const video = { ...state.videos[videoId], isSeen };
      Vue.set(state.videos, videoId, video);
    },
    setActiveVideo(state, { videoId }) {
      Vue.set(state, 'activeVideo', videoId);
    },
    setNextPageToken(state, { nextPageToken }) {
      Vue.set(state, 'nextPageToken', nextPageToken);
    },
  },
});

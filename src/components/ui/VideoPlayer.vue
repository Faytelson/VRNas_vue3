<template>
  <section class="video-player" aria-label="video player">
    <div class="video-player__media-wrapper">
      <video
        class="video-player__video"
        :aria-label="videoData.description"
        preload="metadata"
        tabindex="0"
        @keydown="handleKeydown"
        :ref="videoRef"
      >
        <source :src="videoData.source" type="video/mp4" />
      </video>
      <div class="video-player__poster">
        <img :src="videoData.poster.img.src" :alt="videoData.poster.img.alt" />
        <p class="video-player__subtitle">{{ videoData.poster.subtitle }}</p>
        <h3 class="video-player__title">{{ videoData.poster.title }}</h3>
      </div>
    </div>
    <div class="video-player__controls">
      <button
        :aria-pressed="isPlaying.toString()"
        :aria-label="isPlaying ? 'Pause video' : 'Play video'"
        @click="togglePlayback"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  videoData: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
  },
  source: {
    type: String, //cat.mp4
  },
  poster: {
    type: Object, //img: path, alt; title; subtitle
  },
});

const videoRef = ref(null);
const isPlaying = ref(false);

function togglePlayback() {
  videoRef.value.paused ? videoRef.value.play() : videoRef.value.pause();
}

function addEventListeners() {
  videoRef.value.addEventListener("play", () => (isPlaying.value = true));
  videoRef.value.addEventListener("pause", () => (isPlaying.value = false));
}

onMounted(() => {
  addEventListeners();
});
</script>

<style lang="scss" scoped></style>

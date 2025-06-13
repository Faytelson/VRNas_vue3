<template>
  <section class="video-player" aria-label="video player">
    <div class="video-player__media-wrapper">
      <video
        class="video-player__video"
        :aria-label="description"
        preload="metadata"
        tabindex="0"
        @keydown="handleKeydown"
        :ref="videoRef"
        @click="togglePlayback"
      >
        <source :src="source" type="video/mp4" />
      </video>
      <div class="video-player__poster" v-if="poster">
        <img :src="poster.img.src" :alt="poster.img.alt" />
        <p class="video-player__subtitle">{{ poster.subtitle }}</p>
        <h3 class="video-player__title">{{ poster.title }}</h3>
      </div>
    </div>

    <div class="video-player__controls">
      <button
        class="video-player__button-toggle-playback"
        :aria-pressed="isPlaying.toString()"
        :aria-label="isPlaying ? 'Pause video' : 'Play video'"
        @click="togglePlayback"
      >
        <svg
          v-if="isPlaying"
          class="video-player__pause-icon"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="rgba(255, 255, 255, 0.3)" />

          <rect x="13" y="12" width="4" height="16" rx="1" fill="white" />

          <rect x="23" y="12" width="4" height="16" rx="1" fill="white" />
        </svg>

        <svg
          v-else
          class="video-player__play-icon"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM16.875 27.3361L28.125 21.048C28.9583 20.5822 28.9583 19.4178 28.125 18.952L16.875 12.6639C16.0417 12.1982 15 12.7804 15 13.7119L15 26.2881C15 27.2196 16.0417 27.8018 16.875 27.3361Z"
            fill="white"
            fill-opacity="0.3"
          />
        </svg>
      </button>

      <div class="video-player__progress">
        <div class="video-player__time" role="timer" aria-live="off">
          <span aria-label="Current time">{{ formattedCurrentTime }}</span>
          <span aria-hidden="true">/</span>
          <span aria-label="Total duration">{{ formattedDuration }}</span>
        </div>

        <input
          v-if="currentTime"
          type="range"
          class="video-player__progress-bar"
          :value="currentTime.value"
          min="0"
          :max="duration"
          step="0.1"
          aria-label="Video progress"
          :aria-valuenow="currentTime.value"
          aria-valuemin="0"
          :aria-valuemax="duration"
          @input="updatePlaybackTime"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  description: {
    type: String,
  },
  source: {
    type: String,
  },
  poster: {
    type: Object,
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
  videoRef.value.addEventListener(
    "loadedmetadata",
    () => (duration.value = videoRef.value.duration)
  );
  videoRef.value.addEventListener("timeupdate", () => {
    currentTime.value = videoRef.value.currentTime;
  });
}

watch(videoRef, (newVal) => {
  if (newVal) addEventListeners();
});
</script>

<style lang="scss" scoped>
.video-player {
  &:focus-visible {
    outline: 2px solid red; //временные стили для управления с клавиатуры
  }

  &__button-toggle-playback {
    width: 40px;
    height: 40px;
    transition: transform $transition-ui;

    &:hover {
      transform: scale(1.1);
    }

    &:focus-visible {
      outline: 2px solid red; //временные стили для управления с клавиатуры
    }
  }

  &__pause-icon,
  &__play-icon {
    fill: rgba(255, 255, 255, 0.3);
    transition: fill $transition-ui;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: opacity $transition-ui;

    &:hover {
      fill: rgba(255, 255, 255, 0.7);
    }
  }

  &__pause-icon {
    opacity: v-bind('isPlaying ? "1" : "0"');
  }

  &__play-icon {
    opacity: v-bind('isPlaying ? "0" : "1"');
  }

  &__progress-bar {
    &:focus-visible {
      outline: 2px solid red; //временные стили для управления с клавиатуры
    }
  }
}
</style>

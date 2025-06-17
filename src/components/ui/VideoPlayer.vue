<template>
  <section
    v-if="videoData"
    class="video-player"
    aria-label="video player"
    ref="videoPlayerRef"
  >
    <div
      class="video-player__container"
      @mouseenter="handleControls"
      @mousemove="handleControls"
      @touchstart="handleControls"
      @mouseleave="handleFadeOnLeave"
    >
      <video
        class="video-player__video"
        :aria-label="videoData.description"
        preload="metadata"
        tabindex="0"
        :poster="videoData.poster"
        @keydown="handleKeydown"
        ref="videoRef"
        @click="togglePlayback"
      >
        <source :src="videoData.source" type="video/mp4" />
      </video>

      <Transition name="video-player__controls">
        <div class="video-player__controls" v-show="isShowControls">
          <button
            class="video-player__button-toggle-playback"
            :aria-pressed="isPlaying.toString()"
            :aria-label="isPlaying ? 'Pause video' : 'Play video'"
            @click="togglePlayback"
          >
            <svg
              class="video-player__pause-icon"
              :class="isPlaying ? 'video-player__pause-icon_active' : ''"
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
              class="video-player__play-icon"
              :class="!isPlaying ? 'video-player__play-icon_active' : ''"
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
                fill-opacity="0.7"
              />
            </svg>
          </button>

          <div class="video-player__bottom-panel">
            <div class="video-player__progress">
              <div class="video-player__time" role="timer" aria-live="off">
                <span
                  aria-label="Current time"
                  class="video-player__time-label"
                  >{{ formattedCurrentTime }}</span
                >
                <span aria-hidden="true" class="video-player__time-separator"
                  >/</span
                >
                <span
                  aria-label="Total duration"
                  class="video-player__time-label"
                  >{{ formattedDuration }}</span
                >
              </div>

              <div class="video-player__progress-bar">
                <input
                  type="range"
                  class="video-player__progress-input"
                  :value="currentTime"
                  min="0"
                  :max="duration"
                  step="0.1"
                  aria-label="Video progress"
                  :aria-valuenow="currentTime"
                  aria-valuemin="0"
                  :aria-valuemax="duration"
                  @input="onPlaybackTimeInput"
                />
                <div
                  class="video-player__progress-value"
                  ref="progressValueRef"
                ></div>
              </div>
            </div>

            <button
              class="video-player__button-toggle-fullscreen"
              aria-label="Toggle fullscreen video"
              @click="toggleFullscreen"
            >
              <svg
                class="video-player__fullscreen-icon"
                :class="
                  isVideoPlayerFullscreen
                    ? ''
                    : 'video-player__fullscreen-icon_active'
                "
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  fill="rgba(255, 255, 255, 0.3)"
                />
                <path d="M14 14V10H10V14H12V12H14Z" fill="white" />
                <path d="M26 14H28V10H24V12H26V14Z" fill="white" />
                <path d="M10 24V28H14V26H12V24H10Z" fill="white" />
                <path d="M28 26V28H24V26H26V24H28Z" fill="white" />
              </svg>

              <svg
                class="video-player__exit-fullscreen-icon"
                :class="
                  isVideoPlayerFullscreen
                    ? 'video-player__exit-fullscreen-icon_active'
                    : ''
                "
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  fill="rgba(255, 255, 255, 0.3)"
                />
                <path d="M14 14H16V16H14V14Z" fill="white" />
                <path d="M26 14H24V16H26V14Z" fill="white" />
                <path d="M14 26H16V24H14V26Z" fill="white" />
                <path d="M26 26H24V24H26V26Z" fill="white" />
              </svg>
            </button>
          </div>

          <div class="video-player__info">
            <p class="video-player__subtitle">{{ videoData.info.subtitle }}</p>
            <h3 class="video-player__title">{{ videoData.info.title }}</h3>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import {
  onMounted,
  nextTick,
  ref,
  computed,
  watch,
  onBeforeUnmount,
} from "vue";

const props = defineProps({
  videoData: {
    type: Object,
  },
});

const videoRef = ref(null);
const videoPlayerRef = ref(null);
const progressValueRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const isVideoPlayerFullscreen = ref(false);
const isShowControls = ref(true);
let controlsTimer;
const controlsFadeOnLeave = 1000;
const controlsFadeOnIdle = 3000;

function togglePlayback() {
  videoRef.value.paused ? videoRef.value.play() : videoRef.value.pause();
}

// PROGRESS
// time
const formattedDuration = computed(() => {
  return formatTime(duration.value);
});

const formattedCurrentTime = computed(() => {
  return formatTime(currentTime.value);
});

const formatTime = (floatValueSeconds) => {
  const totalSeconds = floatValueSeconds.toFixed(0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  function addZero(value) {
    return value >= 10 ? value : `0${value}`;
  }

  return `${addZero(minutes)}:${addZero(seconds)}`;
};

// progress-bar
function onPlaybackTimeInput(evt) {
  videoRef.value.currentTime = evt.target.value;
}

const updateProgressBar = () => {
  progressValueRef.value.style.width = `${
    (currentTime.value / duration.value) * 100
  }%`;
};

// function handleSeekStart(evt) {
//   console.log(evt);
// }

// fullscreen
function toggleFullscreen() {
  if (!document.fullscreenEnabled) {
    console.log("Fullscreen unsupported");
    return;
  }

  if (!videoPlayerRef.value) {
    console.log("Player missing");
    return;
  }

  if (document.fullscreenElement === videoPlayerRef.value) {
    document.exitFullscreen().catch((err) => {
      console.log(err);
    });
  } else {
    videoPlayerRef.value.requestFullscreen().catch((err) => {
      console.log(err);
    });
  }
}

// show/hide controls

function handleControls() {
  showControls();
  hideControls(controlsFadeOnIdle);
}

function handleFadeOnLeave() {
  hideControls(controlsFadeOnLeave);
}

function showControls() {
  if (!isShowControls.value) {
    clearTimeout(controlsTimer);
    isShowControls.value = true;
  }
}

function hideControls(fadeDuration) {
  if (
    !isPlaying.value ||
    duration.value - currentTime.value <= fadeDuration / 1000
  ) {
    clearTimeout(controlsTimer);
    return;
  }
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => {
    isShowControls.value = false;
  }, fadeDuration);
}

//  listeners
const onPlayVideo = () => {
  isPlaying.value = true;
};

const onPauseVideo = () => {
  isPlaying.value = false;
  showControls();
};

const onLoadedMetadata = () => {
  duration.value = videoRef.value.duration;
};

const onTimeUpdate = () => {
  currentTime.value = videoRef.value.currentTime;
  updateProgressBar();
};

const onScreenChange = () => {
  isVideoPlayerFullscreen.value =
    document.fullscreenElement === videoPlayerRef.value;
};

function addVideoEventListeners() {
  videoRef.value.addEventListener("play", onPlayVideo);
  videoRef.value.addEventListener("pause", onPauseVideo);
  videoRef.value.addEventListener("loadedmetadata", onLoadedMetadata);
  videoRef.value.addEventListener("timeupdate", onTimeUpdate);
}

function removeVideoEventListeners() {
  videoRef.value.removeEventListener("play", onPlayVideo);
  videoRef.value.removeEventListener("pause", onPauseVideo);
  videoRef.value.removeEventListener("loadedmetadata", onLoadedMetadata);
  videoRef.value.removeEventListener("timeupdate", onTimeUpdate);
}

watch(
  () => props.videoData,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      if (videoRef.value) {
        removeVideoEventListeners(); // если изменится data, но компонент не будет размонтирован
        addVideoEventListeners();
      }
    }
  },
  { immediate: true }
);

onMounted(async () => {
  document.addEventListener("fullscreenchange", onScreenChange);
});

onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", onScreenChange);
  if (videoRef.value) {
    removeVideoEventListeners();
  }
});
</script>

<style lang="scss" scoped>
.video-player {
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;

  &__container {
    position: relative;
    width: 100%;
    max-height: 100%;
    aspect-ratio: 16 / 9;

    // &:focus-visible {
    // outline: 2px solid red; временные стили для управления с клавиатуры
    // }
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__controls {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    transition: opacity $transition-main, transform $transition-main;
    will-change: opacity, transform;

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  &__bottom-panel {
    position: absolute;
    max-width: 100%;
    top: auto;
    bottom: 12px;
    left: 8px;
    right: 8px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: 10px;
  }

  &__button-toggle-playback {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: auto;

    // &:hover {
    // transform: translate(-50%, -50%) scale(1.1); переместить в десктоп
    // }

    &:focus-visible {
      outline: 2px solid red; //временные стили для управления с клавиатуры
    }
  }

  &__pause-icon,
  &__play-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: opacity $transition-ui;
    opacity: 0;

    &_active {
      opacity: 1;
    }
  }

  &__button-toggle-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    pointer-events: auto;
    flex-shrink: 0;
  }

  &__fullscreen-icon,
  &__exit-fullscreen-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity $transition-main;

    &_active {
      opacity: 1;
    }
  }

  &__time {
    display: flex;
    align-items: center;
    gap: 0;
    @include font($font-main, 12px, 500);
    color: $color-white;
  }

  &__time-label {
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  &__progress-bar {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.3);
    flex-grow: 1;
    touch-action: none;
    position: relative;

    &:focus-visible {
      outline: 2px solid red; //временные стили для управления с клавиатуры
    }
  }

  &__progress-value {
    height: 100%;
    max-width: 100%;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.6);
    position: relative;

    &::before {
      @include pseudo;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -4px;
      width: 8px;
      height: 8px;
      background-color: $color-white;
      border-radius: 4px;
    }
  }

  &__progress-input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: auto;
    border: 0;
    overflow: hidden;
    z-index: 1;
    cursor: pointer;
  }

  &__info {
    position: absolute;
    top: 11px;
    left: 8px;
  }

  &__subtitle {
    @include font($font-main, 12px, 500);
    line-height: 1em;
    color: $color-white;
    border-radius: 8px;
    padding: 4px 5px;
    height: 20px;
    background: rgba(255, 255, 255, 0.3);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
  }

  &__title {
    @include font($font-main, 14px, 500);
    line-height: 1.5em;
    color: $color-white;
  }
}

@media screen and (min-width: $mobileMdBreakpoint) {
  .video-player {
    &__bottom-panel {
      left: 16px;
      right: 16px;
      gap: 15px;
    }

    &__button-toggle-fullscreen {
      width: 35px;
      height: 35px;
    }

    &__progress {
      gap: 15px;
    }

    &__time {
      gap: 2px;
    }

    &__time-label {
      width: 34px;
    }

    &__info {
      top: 16px;
      left: 16px;
    }

    &__title {
      font-size: 16px;
    }
  }
}

@media screen and (min-width: $mobileLgBreakpoint) {
  .video-player {
    &__button-toggle-fullscreen {
      width: 40px;
      height: 40px;
    }

    &__time {
      font-size: 14px;
    }

    &__time-label {
      width: 40px;
    }

    &__info {
      top: 24px;
    }

    &__subtitle {
      font-size: 14px;
      line-height: 1.2em;
      border-radius: 16px;
      padding: 4px 10px;
      height: 24px;
      margin-bottom: 8px;
    }

    &__title {
      font-size: 20px;
    }
  }
}

@media screen and (min-width: $tabletMdBreakpoint) {
  .video-player {
    &__button-toggle-fullscreen {
      width: 54px;
      height: 54px;
    }

    &__title {
      font-size: 24px;
    }
  }
}

@media screen and (min-width: $desktopSmBreakpoint) {
  .video-player {
    &__button-toggle-playback {
      width: 70px;
      height: 70px;
    }

    &__bottom-panel {
      bottom: 32px;
      left: 32px;
      right: 32px;
    }

    &__info {
      top: 52px;
      left: 32px;
    }

    &__subtitle {
      font-size: 14px;
      border-radius: 16px;
      height: 26px;
      padding: 2px 10px;
      margin-bottom: 12px;
    }

    &__title {
      font-size: 36px;
    }
  }
}
</style>

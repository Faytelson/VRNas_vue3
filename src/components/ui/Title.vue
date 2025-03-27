<template>
  <div>
    <component
      :is="props.tag"
      class="title"
      :class="`title_${props.type}`"
      v-html="props.text"
    ></component>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  tag: {
    type: String,
    validator: (value) => ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value),
    required: true,
  },
  type: {
    type: String,
    validator: (value) =>
      ["main", "section-name", "description"].includes(value),
    default: "main",
  },
  text: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.title {
  &_main {
    @include font($font-main, 36px, 600);
    line-height: 1.25em;
    letter-spacing: -0.01em;
    color: $color-white;
  }

  &_section-name {
    @include font($font-main, 28px, 600);
    line-height: 1.25em;
    letter-spacing: -0.01em;
    color: $color-white;
  }

  &_description {
    display: inline-block;
    @include font($font-main, 16px, 500);
    letter-spacing: 0.14em;
    background: linear-gradient(90deg, #0cbaf1 0%, #e95ce9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@media screen and (min-width: $mobileLgBreakpoint) {
  .title {
    &_main {
      font-size: 48px;
    }

    &_section-name {
      font-size: 32px;
    }
  }
}

@media screen and (min-width: $desktopMdBreakpoint) {
  .title {
    &_main {
      font-size: 64px;
    }

    &_section-name {
      font-size: 48px;
    }
  }
}
</style>

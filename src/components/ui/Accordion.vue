<template>
  <v-expansion-panels variant="accordion" class="accordion">
    <v-expansion-panel>
      <v-expansion-panel-title>
        Passionate and Experienced Team
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        We are proud of our team of VR experts who are passionate about VR and
        dedicated to delivering the highest quality work. Our team consists of
        experienced VR developers, designers, and technicians who have a proven
        track record of creating immersive and engaging VR experiences.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        Passionate and Experienced Team
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        We are proud of our team of VR experts who are passionate about VR and
        dedicated to delivering the highest quality work. Our team consists of
        experienced VR developers, designers, and technicians who have a proven
        track record of creating immersive and engaging VR experiences.
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup></script>

<style lang="scss" scoped>
.accordion {
  gap: 24px;

  &:deep(.v-expansion-panel) {
    padding: 0 14px;
    background-color: $color-black-2;
    @include border-gradient(90deg, $color-gray-2 0%, $color-black-1 100%);
    border-radius: 0%;
    transition: all $transition-main;
  }

  &:deep(.v-expansion-panel--active) {
    @include border-gradient-colored;
  }

  &:deep(.v-expansion-panel-title) {
    height: 72px;
    @include font($font-main, 16px, 600);
    line-height: 1.4em;
    color: $color-white;
    padding: 0;
    gap: 15px;
  }

  &:deep(.v-expansion-panel-title__overlay) {
    background: transparent;
  }

  &:deep(.v-expansion-panel-title__icon) {
    color: $color-white;
  }

  &:deep(.mdi:before, .mdi-set) {
    font-size: 13px;
  }

  &:deep(.v-expansion-panel-text) {
    @include font($font-main, 12px, 400);
    color: $color-gray-2;
    line-height: 1.67em;
    padding: 12px 0 36px 0;
    position: relative;

    &::before {
      @include pseudo;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.35);
    }
  }

  &:deep(.v-expansion-panel-text__wrapper) {
    padding: 0;
  }
}

@media screen and (min-width: $tabletSmBreakpoint) {
  .accordion {
    &:deep(.v-expansion-panel) {
      padding: 0 24px;
    }

    &:deep(.v-expansion-panel-title) {
      height: 74px;
      @include font($font-main, 20px, 500);
    }

    &:deep(.v-expansion-panel-text) {
      @include font($font-main, 16px, 400);
      line-height: 1.75em;
      padding: 12px 0 32px 0;

      &::before {
        @include pseudo;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.35);
      }
    }
  }
}
</style>

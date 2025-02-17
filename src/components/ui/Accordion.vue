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
    background-color: $color-black-50;
    @include border-gradient(90deg, $color-gray-2 0%, $color-black-100 100%);
    border-radius: 0%;
    transition: all $transition-main;
  }

    &:deep(.v-expansion-panel-title) {
    @include font($font-main, 20px, 500);
    color: $color-white;
    padding: 24px;
  }

  &:deep(.v-expansion-panel-title__icon) {
    color: $color-white;
  }

  &:deep(.mdi:before, .mdi-set) {
    font-size: 13px;
  }
}
</style>

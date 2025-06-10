<template>
  <div class="accordion-info-block">
    <div class="accordion-info-block__visual-section">
      <img :src="require(`@/assets/images/${image.src}`)" :alt="image.alt" />
      <div class="accordion-info-block__box3d">
        <Box3d></Box3d>
      </div>
    </div>

    <div class="accordion-info-block__content-section">
      <Title tag="h3" :styles="['description']">Why choose us</Title>
      <Title tag="h2" :styles="['section-name']">
        Why Choose Us for Your VR Needs
      </Title>
      <Accordion :accordionData="accordionData"></Accordion>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Title from "@/components/ui/Title.vue";
import Accordion from "@/components/ui/Accordion.vue";
import Box3d from "@/components/animations/Box3d.vue";

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  accordionData: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>

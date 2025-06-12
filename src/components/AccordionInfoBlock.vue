<template>
  <div class="accordion-info-block" :class="getType">
    <div class="accordion-info-block__visual-section">
      <img
        :src="require(`@/assets/images/${image.src}`)"
        :alt="image.alt"
        class="accordion-info-block__img"
      />
      <div class="accordion-info-block__box3d">
        <Box3d></Box3d>
      </div>
    </div>

    <div class="accordion-info-block__content-section">
      <div class="accordion-info-block__title-description">
        <Title tag="h3" :styles="['description']">Why choose us</Title>
      </div>
      <div class="accordion-info-block__title">
        <Title tag="h2" :styles="['section-name']">
          Why Choose Us for Your VR Needs
        </Title>
      </div>
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
  type: {
    type: String,
  },
});

const getType = computed(() => {
  if (props.type) return `accordion-info-block_${props.type}`;
});
</script>

<style lang="scss" scoped>
.accordion-info-block {
  &__visual-section {
    margin-bottom: 90px;
    position: relative;

    &::before {
      @include pseudo;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("@/assets/images/background_gradient_dark_sm.png") 0 0 /
          contain no-repeat,
        $color-dark-gradient;
      filter: blur(80px);
      z-index: 0;
    }
  }

  &__img {
    width: 100%;
    max-width: 450px;
    padding: 0 7px 0 15px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  &__box3d {
    position: absolute;
    z-index: 2;
  }

  &__content-section {
    @include container;
  }

  &__title-description {
    margin-bottom: 12px;
  }

  &__title {
    margin-bottom: 32px;
  }
}

@media screen and (min-width: $tabletSmBreakpoint) {
  .accordion-info-block {
    &__img {
      padding: 0;
    }
  }
}

@media screen and (min-width: $desktopSmBreakpoint) {
  .accordion-info-block {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 80px;
    @include container;

    &__visual-section {
      &::before {
        background: url("@/assets/images/background_gradient_dark_sm.png") 0 0 /
            cover no-repeat,
          $color-dark-gradient;
      }
    }

    &__img {
      max-width: 100%;
      margin: 0;
    }

    &__content-section {
      min-width: 0;
      padding: 0;
    }

    &_reverse {
      grid-template-columns: 1fr 400px;

      .accordion-info-block__content-section {
        order: -1;
      }
    }
  }
}

@media screen and (min-width: $desktopMdBreakpoint) {
  .accordion-info-block {
    grid-template-columns: 500px 1fr;

    &_reverse {
      grid-template-columns: 1fr 500px;
    }
  }
}
</style>

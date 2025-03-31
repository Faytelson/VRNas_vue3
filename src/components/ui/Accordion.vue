<template>
  <ul class="accordion" :class="`accordion_${props.variant}`">
    <li
      v-for="(item, index) in accordionStore.accordionAboutUs"
      :key="item.id"
      class="accordion__item"
      :class="{ accordion__item_active: activeIndex === index }"
      :ref="
        (elem) => {
          itemRefs[index] = elem;
        }
      "
      @click="toggleActive(index)"
    >
      <div class="accordion__header">
        <h4 class="accordion__title">{{ item.title }}</h4>
      </div>
      <div class="accordion__content">
        <p class="accordion__text">{{ item.text }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useAccordionsStore } from "../../store/accordions";
import gsap from "gsap";

const accordionStore = useAccordionsStore();
const props = defineProps({
  variant: {
    type: String,
  },
});

// переключение активного элемента
let activeIndex = ref(null);
const itemRefs = ref([]);

const toggleActive = (index) => {
  if (activeIndex.value === index) {
    animateClose(
      itemRefs.value[activeIndex.value].querySelector(".accordion__content")
    );
    activeIndex.value = null;
  } else {
    if (activeIndex.value !== null) {
      animateClose(
        itemRefs.value[activeIndex.value].querySelector(".accordion__content")
      );
    }
    activeIndex.value = index;
    animateOpen(
      itemRefs.value[activeIndex.value].querySelector(".accordion__content")
    );
  }
};
const animateOpen = (elem) => {
  gsap.fromTo(
    elem,
    { height: 0 },
    {
      height: "auto",
      ease: "power1.in",
      duration: 0.4,
    }
  );
};
const animateClose = (elem) => {
  gsap.to(elem, {
    height: 0,
    ease: "power1.in",
    duration: 0.4,
  });
};
</script>

<style lang="scss" scoped>
.accordion {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__item {
    overflow: hidden;
    padding: 0 14px;
    background-color: $color-black-2;
    @include border-gradient(90deg, $color-gray-2 0%, $color-black-1 100%);
    border-radius: 0%;
    transition: all $transition-main;
    cursor: pointer;

    &_active {
      @include border-gradient-colored;
    }
  }

  &__header {
    height: 72px;
    display: flex;
    align-items: center;
    padding-right: 32px;
    position: relative;

    &::after {
      @include pseudo;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      background: url("@/assets/images/icons/icon_arrow_down.svg") center /
        contain no-repeat;
    }
  }

  &__title {
    @include font($font-main, 16px, 600);
    line-height: 1.4em;
    color: $color-white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__content {
    height: 0;
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

  &__text {
    @include font($font-main, 12px, 400);
    color: $color-gray-2;
    line-height: 1.75em;
    padding: 12px 0 36px 0;
  }
}

@media screen and (min-width: $tabletSmBreakpoint) {
  .accordion {
    &__item {
      padding: 0 24px;
    }

    &__header {
      height: 74px;
    }

    &__title {
      @include font($font-main, 20px, 500);
    }

    &__content {
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

    &__text {
      font-size: 16px;
    }
  }
}
</style>

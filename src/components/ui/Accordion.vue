<template>
  <ul class="accordion" :class="getStyle">
    <li
      v-for="(item, index) in accordionData"
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
import { ref, computed } from "vue";
import gsap from "gsap";

const props = defineProps({
  accordionData: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
  },
});

const getStyle = computed(() => {
  let style = "";
  if (props.type) {
    style = `accordion_${props.type}`;
  }
  return style;
});

// переключение активного элемента
let activeIndex = ref(0);
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
  gap: 48px;

  &__item {
    overflow: hidden;
    background-color: $color-black-1;
    cursor: pointer;

    &:first-child .accordion__content {
      height: auto;
    }

    &_active {
      .accordion__header {
        &::after {
          transform: translateY(-50%) rotate(180deg);
          transition: transform $transition-ui;
        }
      }
    }
  }

  &__header {
    height: 38px;
    display: flex;
    align-items: flex-start;
    padding-right: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.35);
    position: relative;

    &::after {
      @include pseudo;
      top: 7px;
      right: 0;
      width: 8px;
      height: 8px;
      background: url("@/assets/images/icons/icon_arrow_down.svg") center /
        contain no-repeat;
      transition: transform $transition-ui;
    }
  }

  &__title {
    @include font($font-main, 20px, 500);
    color: $color-white;
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__content {
    height: 0;
  }

  &__text {
    @include font($font-main, 16px, 400);
    line-height: 1.75em;
    color: $color-gray-2;
    padding: 12px 0;
  }

  &_bordered {
    gap: 24px;

    .accordion__item {
      padding: 0 14px;
      background-color: $color-black-2;
      @include border-gradient(90deg, $color-gray-2 0%, $color-black-1 100%);
      border-radius: 0%;
      transition: all $transition-main;

      &_active {
        @include border-gradient-colored;
      }
    }

    .accordion__header {
      height: 72px;
      align-items: center;
      padding-right: 32px;
      border-bottom: none;

      &::after {
        @include pseudo;
        top: 50%;
        right: 0;
        width: 12px;
        height: 12px;
        background: url("@/assets/images/icons/icon_arrow_down.svg") center /
          contain no-repeat;
      }
    }

    .accordion__title {
      @include font($font-main, 16px, 600);
      line-height: 1.4em;
      color: $color-white;
    }

    .accordion__content {
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

    .accordion__text {
      @include font($font-main, 12px, 400);
      padding: 12px 0 36px 0;
    }
  }
}

@media screen and (min-width: $tabletSmBreakpoint) {
  .accordion {
    &_bordered {
      .accordion__item {
        padding: 0 24px;
      }

      .accordion__header {
        height: 74px;
      }

      .accordion__title {
        @include font($font-main, 20px, 500);
      }

      .accordion__content {
        &::before {
          @include pseudo;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.35);
        }
      }

      .accordion__text {
        font-size: 16px;
        line-height: 1.75em;
        padding: 12px 0 32px 0;
      }
    }
  }
}
</style>

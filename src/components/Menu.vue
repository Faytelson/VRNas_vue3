<template>
  <ul class="menu">
    <li
      class="menu__item"
      v-for="menuItem in navigationStore.menuElems"
      :key="menuItem.id"
    >
      <div v-if="menuItem.submenu" @click="toggleSubmenu($event)">
        <h5 class="menu__title menu__title_submenu">
          {{ menuItem.title }}
        </h5>

        <ul class="menu__submenu submenu">
          <li
            class="submenu__item"
            v-for="subItem in menuItem.submenu"
            :key="subItem.title"
          >
            <a href="#" class="submenu__link">
              {{ subItem.title }}
            </a>
          </li>
        </ul>
      </div>

      <a href="#" class="menu__link" v-else>
        <h5 class="menu__title">{{ menuItem.title }}</h5>
      </a>
    </li>
  </ul>
</template>

<script setup>
import { useNavigationStore } from "@/store/navigation";
import { ref, computed, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import gsap from "gsap";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const navigationStore = useNavigationStore();
const { width } = useWindowSize();
const desktopBreakpoint = 1024;
const isMenuActive = computed(() => props.isActive);

// анимация submenu
const activeSubmenu = ref(null);
const prevSubmenu = ref(null);

const openSubmenu = (elem) => {
  gsap.fromTo(
    elem,
    { opacity: 0, height: 0 },
    {
      opacity: 1,
      height: "auto",
      duration: 0.3,
      onComplete: () => {
        elem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      },
    }
  );
};
const closeSubmenu = (elem) => {
  gsap.to(elem, {
    opacity: 0,
    height: 0,
    duration: 0.3,
  });
};
const toggleSubmenu = (event) => {
  if (event.target.closest("a")) {
    return;
  }
  if (width.value > desktopBreakpoint) {
    return;
  }

  activeSubmenu.value = event.currentTarget.querySelector(".submenu");

  if (prevSubmenu.value === activeSubmenu.value) {
    closeSubmenu(activeSubmenu.value);
    prevSubmenu.value = null;
    return;
  }

  if (prevSubmenu.value !== null) {
    closeSubmenu(prevSubmenu.value);
  }

  openSubmenu(activeSubmenu.value);
  prevSubmenu.value = activeSubmenu.value;
};
const resetSubmenus = () => {
  if (activeSubmenu.value) {
    closeSubmenu(activeSubmenu.value);
  }
  activeSubmenu.value = null;
  prevSubmenu.value = null;
};

watch(isMenuActive, (currentStatus) => {
  if (width.value < desktopBreakpoint && !currentStatus) {
    resetSubmenus();
  }
});
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;

  &__title {
    @include font($font-main, 24px, 300);
    color: $color-gray-2;
    height: 48px;
    display: flex;
    align-items: center;

    &_submenu {
      position: relative;
      padding-right: 22px;

      &::after {
        @include pseudo;
        top: 0;
        right: 0;
        height: 100%;
        width: 10px;
        background: url("@/assets/images/icons/icon_arrow_down.svg") 0 50% /
          contain no-repeat;
      }
    }
  }
}

.submenu {
  height: 0;
  overflow: hidden;
  opacity: 0;

  &__link {
    display: block;
    @include font($font-main, 18px, 300);
    color: $color-gray-2;
    padding: 10px 20px;
  }
}

@media screen and (min-width: $desktopSmBreakpoint) {
  .menu {
    flex-direction: row;
    justify-content: center;
    gap: 64px;

    &__item {
      position: relative;

      &:hover .submenu {
        opacity: 1;
        visibility: visible;
      }
    }

    &__link,
    &__title {
      font-size: 18px;
      line-height: 1.75em;
    }
  }

  .submenu {
    position: absolute;
    top: 100%;
    right: 0;
    width: max-content;
    min-width: 100px;
    max-width: 250px;
    height: auto;
    visibility: hidden;
    padding-left: 0;
    background-color: $color-deep-black;
    transition: opacity $transition-main;
    border-radius: 3px;

    &__link {
      font-size: 16px;
    }
  }
}

@media screen and (min-width: $mobileLgBreakpoint) {
  .menu {
    &__title {
      display: inline-flex;
    }
  }
}
</style>

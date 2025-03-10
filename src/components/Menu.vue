<template>
  <ul class="menu">
    <li
      class="menu__item"
      v-for="menuItem in navigationStore.menuElems"
      :key="menuItem.title"
    >
      <div v-if="menuItem.submenu">
        <h5
          class="menu__title menu__title_submenu"
          @click="toggleSubmenu($event)"
        >
          {{ menuItem.title }}
        </h5>

        <ul class="menu__submenu">
          <li
            class="menu__submenu-item"
            v-for="subItem in menuItem.submenu"
            :key="subItem.title"
          >
            <a href="#" class="menu__submenu-title">
              {{ subItem.title }}
            </a>
          </li>
        </ul>
      </div>

      <a href="#" class="menu__title" v-else>
        {{ menuItem.title }}
      </a>
    </li>
  </ul>
</template>

<script setup>
import { useNavigationStore } from "@/store/navigation";
import { ref, computed, watch } from "vue";
import gsap from "gsap";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const navigationStore = useNavigationStore();

const isMenuActive = computed(() => props.isActive);

// анимация появления элементов основного меню

// анимация подменю
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
  activeSubmenu.value = event.currentTarget.nextElementSibling;

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

watch(isMenuActive, (currentStatus) => {
  if (!currentStatus) {
    activeSubmenu.value = null;
    prevSubmenu.value = null;
  }
});
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title {
    @include font($font-main, 24px, 300);
    color: $color-gray-2;

    &_submenu {
      position: relative;
      padding-right: 18px;

      &::after {
        @include pseudo;
        top: 0;
        right: 0;
        height: 100%;
        width: 10px;
        background: url("@/assets/images/icons/icon_arrow_down.svg") 0 12px /
          contain no-repeat;
      }
    }
  }

  &__submenu {
    background-color: $color-deep-black;
    height: 0;
    opacity: 0;
    overflow: hidden;
  }

  &__submenu-item {
    padding: 10px 20px;
  }

  &__submenu-title {
    @include font($font-main, 18px, 300);
    color: $color-gray-2;
  }
}

@media screen and (min-width: $desktopBreakpoint) {
  .menu {
    flex-direction: row;
    gap: 64px;

    &__title {
      font-size: 16px;
      line-height: 1.75em;
    }

    &__submenu {
      padding-left: 0;
    }
  }
}
</style>

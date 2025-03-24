<template>
  <header class="header">
    <div v-if="isMobile" class="header__mobile">
      <Logo></Logo>

      <Burger @click="toggleMenu" :isActive="isMenuActive"></Burger>

      <nav class="mobile-nav">
        <div class="mobile-nav__menu">
          <Menu :isActive="isMenuActive"></Menu>
        </div>

        <div class="mobile-nav__button">
          <ButtonMain
            tag="button"
            label="Contact us"
            variant="secondary"
          ></ButtonMain>
        </div>
      </nav>
    </div>

    <div v-else class="header__desktop">
      <Logo></Logo>

      <nav class="desktop-nav">
        <div class="desktop-nav__menu">
          <Menu></Menu>
        </div>

        <div class="desktop-nav__button">
          <ButtonMain
            tag="button"
            label="Contact us"
            variant="secondary"
          ></ButtonMain>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useNavigationStore } from "@/store/navigation";
import { ref, computed, watch, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
import gsap from "gsap";
// components
import Logo from "./Logo.vue";
import Burger from "./ui/Burger.vue";
import ButtonMain from "./ui/ButtonMain.vue";
import Menu from "./Menu.vue";

// breakpoints & window
const { width, height } = useWindowSize();
const desktopBreakpoint = 1024;
const isMobile = computed(() => width.value < desktopBreakpoint);

// код для корректного отображения шапки на моб устройствах
const vh = computed(() => height.value * 0.01);
const updateVH = () => {
  document.documentElement.style.setProperty("--vh", `${vh.value}px`);
};

onMounted(() => {
  updateVH();
});

watch(height, () => {
  if (isMobile.value) {
    updateVH();
  }
});

// меню
const navigationStore = useNavigationStore();
const isMenuActive = computed(() => navigationStore.isMenuActive);

const toggleMenu = () => {
  navigationStore.isMenuActive = !navigationStore.isMenuActive;
};

watch(width, (newWidth) => {
  if (newWidth >= desktopBreakpoint) {
    navigationStore.isMenuActive = false;
  }
});

watch(isMenuActive, (newMenuStatus) => {
  const navTL = gsap.timeline();
  if (newMenuStatus) {
    navTL.to(".mobile-nav", {
      opacity: 1,
      visibility: "visible",
      duration: 0.6,
      ease: "power2.out",
    });
  } else {
    navTL
      .clear()
      .to(".mobile-nav", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
      })
      .set(".mobile-nav", { visibility: "hidden" }, "+=0.3");
  }
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height-mobile;
  background-color: $color-black-1;
  z-index: 999;
  @include container;

  &__mobile {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__desktop {
    display: none;
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 30px;
  height: calc(100vh - $header-height-mobile);
  height: calc(var(--vh, 1vh) * 100 - $header-height-mobile);
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  overflow-y: auto;
  padding: 12px 16px 20px;
  background-image: linear-gradient(
      90deg,
      rgba(37, 37, 50, 0.95),
      rgba(37, 37, 50, 0.95)
    ),
    linear-gradient(rgba(12, 186, 241, 0.5) 0%, rgba(233, 92, 233, 0.4) 100%);
  opacity: 0;
  visibility: hidden;
}

@media screen and (min-width: $desktopSmBreakpoint) {
  .header {
    height: $header-height-desktop;

    &__mobile {
      display: none;
    }

    &__desktop {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .desktop-nav {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &__menu {
      flex-grow: 1;
    }
  }
}

@media screen and (min-width: $mobileLgBreakpoint) {
  .mobile-nav {
    &__button {
      align-self: center;
    }
  }
}
</style>

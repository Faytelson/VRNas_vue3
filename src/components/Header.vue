<template>
  <header class="header">
    <div class="header__container">
      <nav v-if="isMobile" class="header__mobile">
        <a href="#" class="header__logo">
          <img
            src="@/assets/images/logo.png"
            alt="Логотип компании VRNas"
            class="header__logo-img"
          />
        </a>
        <div class="header__burger">
          <Burger @click="toggleMenu" :isActive="isMenuActive"></Burger>
        </div>
        <div class="header__mobile-nav js-mobile-nav">
          <div class="header__mobile-menu">
            <Menu :isActive="isMenuActive"></Menu>
          </div>
          <div class="header__mobile-button">
            <ButtonMain
              tag="button"
              label="Contact us"
              variant="secondary"
            ></ButtonMain>
          </div>
        </div>
      </nav>

      <nav v-else class="header__desktop">
        <a href="#" class="header__logo">
          <img
            src="@/assets/images/logo.png"
            alt="Логотип компании VRNas"
            class="header__logo-img"
          />
        </a>
        <div class="header__desktop-menu">
          <Menu></Menu>
        </div>
        <div class="header__desktop-button">
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
    navTL.to(".js-mobile-nav", {
      opacity: 1,
      visibility: "visible",
      duration: 0.6,
      ease: "power2.out",
    });
  } else {
    navTL
      .clear()
      .to(".js-mobile-nav", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
      })
      .set(".js-mobile-nav", { visibility: "hidden" }, "+=0.3");
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: $header-height-mobile;
  position: relative;

  &__container {
    width: 100%;
    height: 100%;
    padding: 0 16px;
  }

  &__logo {
    width: 101px;
    height: 30px;
  }

  &__mobile {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__mobile-nav {
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

  &__desktop {
    display: none;
  }
}

@media screen and (min-width: $desktopBreakpoint) {
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
}

@media screen and (min-width: $mobileLgBreakpoint) {
  .header {
    &__mobile-button {
      align-self: center;
    }
  }
}
</style>

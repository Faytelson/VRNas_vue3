<template>
  <div class="app">
    <div class="app__header">
      <Header></Header>
    </div>
    <div class="app__container">
      <div class="app__breadcrumbs">
        <Breadcrumbs></Breadcrumbs>
      </div>
      <div class="app__buttons">
        <ButtonMain
          tag="button"
          label="Variant 1"
          variant="primary"
        ></ButtonMain>

        <ButtonMain
          tag="button"
          label="Variant 1"
          variant="primary"
          :disabled="true"
        ></ButtonMain>

        <ButtonMain
          tag="button"
          label="Variant 2"
          variant="secondary"
        ></ButtonMain>

        <ButtonMain
          tag="button"
          label="Variant 2"
          variant="secondary"
          :disabled="true"
        ></ButtonMain>
      </div>
      <div class="app__accordion">
        <Accordion></Accordion>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useNavigationStore } from "./store/navigation";
// components
import ButtonMain from "@/components/ui/ButtonMain";
import Accordion from "./components/ui/Accordion.vue";
import Breadcrumbs from "./components/ui/Breadcrumbs.vue";
import Header from "./components/Header.vue";

const navigationStore = useNavigationStore();
const isMenuActive = computed(() => navigationStore.isMenuActive);

watch(isMenuActive, (value) => {
  if (value) {
    document.body.classList.add("locked");
  } else {
    document.body.classList.remove("locked");
  }
});
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  background-color: $color-deep-black;
  padding: 122px 0 50px;

  &__container {
    max-width: 80%;
    margin: 0 auto;
  }

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $color-deep-black;
    z-index: 999;
  }

  &__breadcrumbs {
    margin-bottom: 20px;
  }

  &__buttons {
    margin-bottom: 45px;
  }
}
</style>

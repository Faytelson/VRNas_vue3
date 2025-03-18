<template>
  <div class="layout">
    <Header></Header>

    <main>
      <Breadcrumbs></Breadcrumbs>

      <ButtonMain tag="button" label="Variant 1" variant="primary"></ButtonMain>

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

      <Accordion></Accordion>
    </main>
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
.layout {
  background-color: $color-deep-black;
  padding: $header-height-mobile 0 100px; //временный отступ снизу
}

@media screen and (min-width: $desktopSmBreakpoint) {
  .layout {
    padding-top: $header-height-desktop;
  }
}

main {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

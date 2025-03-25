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

      <FeatureList></FeatureList>
    </main>

    <Footer></Footer>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useNavigationStore } from "@/store/navigation";
// components
import ButtonMain from "@/components/ui/ButtonMain";
import Accordion from "@/components/ui/Accordion.vue";
import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeatureList from "./components/lists/FeatureList.vue";

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
  background-color: $color-black-1;
  padding-top: $header-height-mobile;
}

@media screen and (min-width: $desktopSmBreakpoint) {
  .layout {
    padding-top: $header-height-desktop;
  }
}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
  @include container;
}
</style>

<template>
  <div class="layout">
    <Header></Header>

    <main class="main">
      <Breadcrumbs></Breadcrumbs>

      <AccordionInfoBlock
        :image="accordionChooseUsImage"
        :accordionData="accordionChooseUs"
      ></AccordionInfoBlock>

      <div class="main__container">
        <CountBadge title="Happy Clients" subtitle="32k+"></CountBadge>

        <Title tag="h1" :styles="['main']">
          Immerse Yourself <br />in Virtual Reality
        </Title>

        <Title tag="h2" :styles="['section-name']">
          Bring your events to life like never before with our VR services
        </Title>

        <Title tag="h3" :styles="['description']">About us</Title>

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

        <Accordion
          :accordionData="accordionChooseUs"
          type="bordered"
        ></Accordion>

        <FeatureList></FeatureList>

        <NavigationListPanel></NavigationListPanel>

        <IconList></IconList>
      </div>
    </main>

    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useNavigationStore } from "@/store/navigation";
// components
import ButtonMain from "@/components/ui/ButtonMain";
import Accordion from "@/components/ui/Accordion.vue";
import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeatureList from "@/components/lists/FeatureList.vue";
import NavigationListPanel from "@/components/lists/NavigationListPanel.vue";
import Title from "@/components/ui/Title.vue";
import IconList from "@/components/lists/IconList.vue";
import CountBadge from "@/components/ui/CountBadge.vue";
import AccordionInfoBlock from "@/components/AccordionInfoBlock.vue";

const navigationStore = useNavigationStore();
const isMenuActive = computed(() => navigationStore.isMenuActive);

watch(isMenuActive, (value) => {
  if (value) {
    document.body.classList.add("locked");
  } else {
    document.body.classList.remove("locked");
  }
});

// mock data
const accordionChooseUsImage = {
  src: "image_man_in_vr.png",
  alt: "accordion image",
};

const accordionChooseUs = ref([]);
async function fetchAccordionChooseUs() {
  const response = await fetch("/mock-data/accordion_chooseUs.json");
  const data = await response.json();
  accordionChooseUs.value = data;
}

onMounted(() => {
  fetchAccordionChooseUs();
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

// временные стили для тестирования
.main {
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 50px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    @include container;
  }
}
</style>

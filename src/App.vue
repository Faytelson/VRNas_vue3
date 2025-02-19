<template>
  <div class="app">
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
import ButtonMain from "@/components/ui/ButtonMain";
import Accordion from "./components/ui/Accordion.vue";
import Breadcrumbs from "./components/ui/Breadcrumbs.vue";
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  background-color: black;

  &__container {
    max-width: 80%;
    margin: 0 auto;
  }

  &__buttons {
    margin-bottom: 45px;
  }
}
</style>

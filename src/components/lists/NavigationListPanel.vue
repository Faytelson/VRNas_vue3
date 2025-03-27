<template>
  <ul class="navigation-list-panel">
    <li
      class="navigation-list-panel__item"
      v-for="card in cardsStore.serviceCards"
      :key="card.id"
    >
      <a href="#test" class="navigation-list-panel__item-link">
        <OptionsCard :cardInfo="card"></OptionsCard>
      </a>
    </li>
  </ul>
</template>

<script setup>
// components
import { useCardsStore } from "../../store/cards";
import OptionsCard from "../cards/OptionsCard.vue";

const cardsStore = useCardsStore();
</script>

<style lang="scss" scoped>
.navigation-list-panel {
  display: grid;
  row-gap: 32px;
  column-gap: 30px;
}

@media screen and (min-width: $tabletSmBreakpoint) {
  .navigation-list-panel {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    &__item {
      position: relative;

      &:nth-child(even) {
        top: 57px;
      }
    }
  }
}

@media screen and (min-width: $tabletMdBreakpoint) {
  .navigation-list-panel {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media screen and (min-width: $desktopMdBreakpoint) {
  .navigation-list-panel {
    grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));

    &__item {
      &:nth-child(even) {
        top: 0;
      }

      &:nth-child(3n + 2) {
        top: 57px;
      }

      &:nth-child(3n + 3) {
        top: 114px;
      }
    }
  }
}
</style>

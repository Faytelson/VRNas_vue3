<template>
  <footer class="footer">
    <div class="footer__subscribe-form subscribe-form">
      <Form></Form>
    </div>

    <nav class="footer__nav">
      <div class="footer__brand-socials">
        <div class="footer__logo">
          <Logo></Logo>
        </div>

        <div class="footer__socials">
          <Socials></Socials>
        </div>
      </div>

      <div class="footer__footer-links footer-links footer-links_quicklinks">
        <h3 class="footer-links__title">Quicklinks</h3>
        <ul class="footer-links__list">
          <li
            class="footer-links__list-item"
            v-for="link in navigationStore.footerQuickLinks"
            :key="link.id"
          >
            <a href="" class="footer-links__link">{{ link.title }}</a>
          </li>
        </ul>
      </div>

      <div class="footer__footer-links footer-links footer-links_support">
        <h3 class="footer-links__title">Support</h3>
        <ul class="footer-links__list">
          <li
            class="footer-links__list-item"
            v-for="link in navigationStore.footerSupportLinks"
            :key="link.id"
          >
            <a href="" class="footer-links__link">{{ link.title }}</a>
          </li>
        </ul>
      </div>

      <div class="footer__footer-links footer-links footer-links_needhelp">
        <h3 class="footer-links__title">Need Help?</h3>
        <ul class="footer-links__list">
          <li
            class="footer-links__list-item"
            v-for="link in navigationStore.footerHelpLinks"
            :key="link.id"
          >
            <a href="" class="footer-links__link">
              <img
                :src="link.img.path"
                :alt="link.img.alt"
                class="footer-links__link-img"
              />
              <span class="footer-links__link-title">{{ link.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <p class="footer__copyright-info">© Copyright 2023, All Rights Reserved</p>
  </footer>
</template>

<script setup>
import { useNavigationStore } from "../store/navigation";
// components
import Logo from "./Logo.vue";
import Socials from "./Socials.vue";
import Form from "./ui/Form.vue";

const navigationStore = useNavigationStore();
</script>

<style lang="scss" scoped>
.footer {
  background: url("@/assets/images/footer_background.png") 0 100% / contain
    no-repeat;
  @include container;

  &__subscribe-form {
    margin-bottom: 92px;
  }

  &__nav {
    display: grid;
    grid-template-areas:
      "soc soc"
      "q sup"
      "nh nh";
    row-gap: 56px;
    column-gap: 50px;
    padding-bottom: 50px;
    position: relative;

    &::after {
      @include pseudo;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: $color-linear;
      opacity: 0.5;
    }
  }

  &__brand-socials {
    grid-area: soc;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: space-between;
  }

  &__copyright-info {
    @include font($font-main, 16px, 300);
    color: $color-gray-2;
    padding: 32px 0 24px;
    text-align: center;
  }
}

.footer-links {
  &_quicklinks {
    grid-area: q;
  }

  &_support {
    grid-area: sup;
  }

  &_needhelp {
    grid-area: nh;
  }

  &__title {
    @include font($font-main, 16px, 600);
    color: $color-white;
    margin-bottom: 16px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  &__link {
    display: flex;
    gap: 10px;
    @include font($font-main, 16px, 300);
    line-height: 28px;
    color: $color-gray-2;
    vertical-align: top;
  }

  &__link-title {
    line-height: 1.4em;
  }

  &__link-img {
    display: inline-block;
    margin-top: 3px;
    width: 17px;
    height: 17px;
  }
}

@media screen and (min-width: $tabletMdBreakpoint) {
  .footer {
    background: url("@/assets/images/footer_background_lg.png") 0 100% / contain
      no-repeat;
    &__nav {
      grid-template-areas:
        "soc nh"
        "q sup"
        "q sup";
    }

    &__brand-socials {
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
}

@media screen and (min-width: $desktopSmBreakpoint) {
  .footer {
    background: url("@/assets/images/footer_background_lg.png") 0 100% / auto
      no-repeat;
  }
}

@media screen and (min-width: $desktopMdBreakpoint) {
  .footer {
    &__nav {
      grid-template-areas: "soc q sup nh";
      grid-template-columns: 2fr 1fr 1fr 2fr;
    }
  }
}

@media screen and (min-width: $desktopXlBreakpoint) {
  .footer {
    background: url("@/assets/images/footer_background_lg.png") -250px calc(100% + 20px) / 72% auto
      no-repeat;
  }
}
</style>

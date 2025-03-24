<template>
  <form class="form">
    <h3 class="form__title">
      Subscribe to our newsletter <br />
      for latest updates
    </h3>
    <div class="form__container">
      <input
        type="email"
        class="form__input"
        placeholder="Enter your email address"
      />
      <button class="form__button">
        <img
          src="@/assets/images/icons/icon_telegram.svg"
          alt="Telegram icon"
          class="form__icon"
        />
      </button>
    </div>
  </form>
</template>

<script setup></script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 31px 13px;
  background: $color-linear;
  border-radius: 4px;
  row-gap: 8px;

  &__title {
    @include font($font-main, 28px, 600);
    line-height: 1.4em;
    color: $color-white;
    text-align: center;
  }

  &__container {
    position: relative;
    width: 100%;
    max-width: 365px;
    flex-shrink: 0;

    &::before {
      @include pseudo;
      top: 50%;
      transform: translateY(-50%);
      left: 14px;
      width: 24px;
      height: 24px;
      background: url("@/assets/images/icons/icon_mail.svg") center / contain
        no-repeat;
    }
  }

  &__input {
    display: block;
    width: 100%;
    height: 56px;
    background: rgba(255, 255, 255, 0.07);
    padding-left: 44px;
    padding-right: 56px;

    &::placeholder {
      @include font($font-main, 14px, 400);
      line-height: 1.2em;
      color: $color-white;
    }
  }

  &__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.21);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}

@media screen and (min-width: $mobileMdBreakpoint) {
  .form {
    &__input {
      &::placeholder {
        font-size: 16px;
      }
    }
  }
}

@media screen and (min-width: $tabletMdBreakpoint) {
  .form {
    flex-direction: row;
    justify-content: space-between;
    column-gap: 30px;
    padding-left: 24px;
    padding-right: 24px;

    &__title {
      font-size: 40px;
      text-align: left;
    }
  }
}

@media screen and (min-width: $desktopMdBreakpoint) {
  .form {
    padding: 38px 74px;
  }
}

@media screen and (min-width: $desktopXlBreakpoint) {
  .form {
    &__container {
      max-width: 600px;
    }
  }
}
</style>

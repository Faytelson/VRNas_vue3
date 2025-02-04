<template>
  <!-- не исключено испозьзование vuetify-tabs -->
  <div class="animated-tabs">
    <!-- v-if desktop -->
    <div class="animated-tabs__buttons" role="tablist">
      <button
        class="animated-tabs__button"
        role="tab"
        aria-selected="true"
        id="tab-1"
        aria-controls="panel-1"
      >
        VR Development
      </button>
      <button
        class="animated-tabs__button"
        role="tab"
        aria-selected="false"
        id="tab-2"
        aria-controls="panel-2"
      >
        VR Games
      </button>
    </div>

    <!-- v-if mobile -->
    <div class="animated-tabs__slider" role="tablist">
      <div class="tab-buttons__slide">
        <!-- component option-button -->
        <button
          class="tab-buttons__button"
          role="tab"
          aria-selected="true"
          id="tab-1"
          aria-controls="panel-1"
        >
          VR Development
        </button>
      </div>
      <div class="tab-buttons__slide">
        <button
          class="tab-buttons__button"
          role="tab"
          aria-selected="false"
          id="tab-2"
          aria-controls="panel-2"
        >
          VR Games
        </button>
      </div>
    </div>

    <div class="animated-tabs__tab-content">
      <!-- component tab-content -->
      <div class="tab-content" role="tabpanel">
        <div class="tab-content__item" id="panel-1" aria-labelledby="tab-1">
          <h3 class="tab-content__subtitle">
            <!-- component title -->
          </h3>
          <h2 class="tab-content__title">
            <!-- component title -->
          </h2>
          <div class="tab-content__description">
            <p class="tab-content__text">
              At our VR design service, we specialize in creating immersive and
              engaging virtual reality experiences that transport your audience
              to a whole new world. Our team of experienced designers and
              developers work together to create VR experiences that are not
              only visually stunning but also interactive and user-friendly. We
              take a collaborative approach to our VR design process, working
              closely with you to understand your specific needs and goals.
              Whether you're looking to create a VR training program, a
              marketing campaign, or a game, we can help you bring your
              idealife.
            </p>
          </div>

          <div class="tab-content__list">
            <h5 class="tab-content__list-title">
              Our VR design services include:
            </h5>
            <!-- component icon-list -->
            <ul class="icon-list" aria-label="Our VR services">
              <li class="icon-list__item">
                <img src="" alt="" class="icon-list__item-img" />
                <p class="icon-list__item-text">
                  Concept development and ideation
                </p>
              </li>
            </ul>
          </div>

          <!-- extra text -->
          <div class="tab-content__description">
            <p class="tab-content__text">
              We use the latest VR technologies and software to create immersive
              experiences that are fully customized to your brand and message.
              We understand that every project is unique, and we work closely
              with you to ensure that we create a VR experience that perfectly
              matches your vision.
            </p>
            <p class="tab-content__text">
              We use the latest VR technologies and software to create immersive
              experiences that are fully customized to your brand and message.
              We understand that every project is unique, and we work closely
              with you to ensure that we create a VR experience that perfectly
              matches your vision.
            </p>
          </div>

          <div class="tab-content__button">
            <!-- component button -->
            <!-- назначить кнопке aria-label="Contact us for VR Development" -->
          </div>
        </div>

        <div
          class="tab-content__item"
          id="panel-2"
          aria-labelledby="tab-2"
          aria-hidden="true"
        >
          <h3 class="tab-content__subtitle">
            <!-- component title -->
          </h3>
          <h2 class="tab-content__title">
            <!-- component title -->
          </h2>
          <div class="tab-content__description">
            <p class="tab-content__text">
              At our VR design service, we specialize in creating immersive and
              engaging virtual reality experiences that transport your audience
              to a whole new world. Our team of experienced designers and
              developers work together to create VR experiences that are not
              only visually stunning but also interactive and user-friendly. We
              take a collaborative approach to our VR design process, working
              closely with you to understand your specific needs and goals.
              Whether you're looking to create a VR training program, a
              marketing campaign, or a game, we can help you bring your
              idealife.
            </p>
          </div>

          <div class="tab-content__icon-list">
            <!-- component icon-list -->
            <div class="icon-list" aria-label="VR Games we make">
              <h5 class="icon-list__title">Our VR design services include:</h5>
              <ul class="icon-list__list">
                <li class="icon-list__item">
                  <img src="" alt="" class="icon-list__item-img" />
                  <p class="icon-list__item-text">
                    Concept development and ideation
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <!-- extra text -->
          <div class="tab-content__description">
            <p class="tab-content__text">
              We use the latest VR technologies and software to create immersive
              experiences that are fully customized to your brand and message.
              We understand that every project is unique, and we work closely
              with you to ensure that we create a VR experience that perfectly
              matches your vision.
            </p>
            <p class="tab-content__text">
              We use the latest VR technologies and software to create immersive
              experiences that are fully customized to your brand and message.
              We understand that every project is unique, and we work closely
              with you to ensure that we create a VR experience that perfectly
              matches your vision.
            </p>
          </div>

          <div class="tab-content__button">
            <!-- component button -->
            <!-- назначить кнопке aria-label="Contact us for VR Development" -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

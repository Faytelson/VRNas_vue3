import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/main.scss";
// plugins
import vuetify from "@/plugins/vuetify";

createApp(App).use(vuetify).mount("#app");

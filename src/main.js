import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@/assets/styles/main.scss";
import vuetify from "@/plugins/vuetify";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(vuetify);
app.mount("#app");

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import store from "@/store/index.js";
import numberFormat from "@/helpers/numberFormat";
import declOfNum from "@/helpers/declOfNum";

const app = createApp(App);

app.use(router).use(store).mount("#app");
app.config.globalProperties.$filters = {
  numberFormat,
  declOfNum,
};

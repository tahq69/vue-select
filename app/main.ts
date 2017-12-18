import Vue from "vue"

import App from "./components/Docs.vue"

import CripVueSelect from "@/main"
import router from "./router"

Vue.use(CripVueSelect)

const app = new Vue({
  render: h => h(App),
  router,
})

app.$mount(document.getElementById("app") || undefined)

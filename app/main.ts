import Vue from "vue"

import "./assets/styles.scss"

import App from "./components/Docs.vue"

import { CripSelectOptions } from "$/index"
import CripVueSelect from "@/main"
import router from "./router"

Vue.use<CripSelectOptions>(CripVueSelect, {logLevel: "debug"})

const app = new Vue({
  render: h => h(App),
  router,
})

app.$mount(document.getElementById("app") || undefined)

import Vue from "vue"

import CripSelect, { IOptions as CripSelectOptions } from "./../main"
import Example from "./Example.vue"

Vue.use<CripSelectOptions>(CripSelect)

const app = new Vue({
  render: h => h(Example),
})

app.$mount(document.getElementById("app"))

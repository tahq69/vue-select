import Vue from "vue"

import CripSelect, { sample } from "./main"

Vue.use(CripSelect)

const app = new Vue({
  render: h => h(sample),
})

app.$mount(document.getElementById("app"))

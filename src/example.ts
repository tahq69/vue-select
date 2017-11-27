import Vue from "vue"

import CripSelect from "./main"
import Sample from "./Sample.vue"

Vue.use(CripSelect)

const app = new Vue({
  render: h => h(Sample),
})

app.$mount(document.getElementById("app"))

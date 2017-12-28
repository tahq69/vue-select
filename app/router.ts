import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import AsyncOptions from "./components/AsyncOptions.vue"
import Configurations from "./components/Configurations.vue"
import DefaultUsage from "./components/DefaultUsage.vue"
import TagsUsage from "./components/TagsUsage.vue"

const router = new Router({
  routes: [
    { path: "/", name: "root", component: DefaultUsage },
    { path: "/tags", name: "tags", component: TagsUsage },
    { path: "/async", name: "async", component: AsyncOptions },
    { path: "/configurations", name: "configurations", component: Configurations },
    { path: "*", redirect: "/" },
  ],
})

export default router

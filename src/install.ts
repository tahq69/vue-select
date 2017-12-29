import Vue from "vue"

import CripSelect from "./components/CripSelect.vue"
import { Options } from "./contracts"

let installed = false
let privateVue: any

export default function install(vue: typeof Vue, options?: Options): void {
  if (installed && privateVue === vue) return

  installed = true
  privateVue = vue

  const defaults: Options = {
    componentPrefix: "Crip",
  }

  const parameters = Object.assign(defaults, options)

  vue.component(`${parameters.componentPrefix}Select`, CripSelect)
}

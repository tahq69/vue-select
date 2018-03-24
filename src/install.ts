import Vue from "vue"

import { CripSelectInstallSettings } from "$/plugin"
import CripSelect from "./components/CripSelect.vue"

let installed = false
let privateVue: any

export default function install(vue: typeof Vue, options?: CripSelectInstallSettings): void {
  if (installed && privateVue === vue) return

  installed = true
  privateVue = vue

  const defaults: CripSelectInstallSettings = {
    componentPrefix: "Crip",
  }

  const parameters = Object.assign(defaults, options)

  vue.component(`${parameters.componentPrefix}Select`, CripSelect)
}

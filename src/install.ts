import Vue from "vue"

import { CripSelectOptions, LogLevel } from "$/plugin"
import { log, setVerbose } from "@/help"
import CripSelect from "./components/CripSelect.vue"

interface Settings {
  componentPrefix: string
  logLevel: LogLevel
  verbose: boolean
}

let installed = false
let privateVue: any

export default function install(vue: typeof Vue, options?: CripSelectOptions): void {
  if (installed && privateVue === vue) return

  installed = true
  privateVue = vue

  const defaults: Settings = {
    componentPrefix: "Crip",
    logLevel: "error",
    verbose: true
  }

  const parameters = Object.assign(defaults, options)

  if (parameters.verbose) setVerbose(parameters.logLevel)

  log("debug", "install", { options, parameters })

  vue.component(`${parameters.componentPrefix}Select`, CripSelect)
}

import Vue from "vue"

type InitOption = CripSelectOption | Promise<CripSelectOption>
type OnUpdate = (criteria: string) => Options
type Options = CripSelectOption[]

export interface CripSelectConstructorSettings {
  options?: Options
  async?: boolean
  onUpdate?: OnUpdate
  onInit?: InitOption
}

export interface CripSelectOptions {
  componentPrefix: string
}

export interface CripSelectOption {
  key: string
  text: string
  value: any
}

export interface Plugin {
  install: (vue: typeof Vue, options?: CripSelectOptions) => void
  version: string
  async: boolean

  new (settings: CripSelectConstructorSettings | Options): Plugin
  onUpdate(callback: OnUpdate): void
  onInit(selected: InitOption): void
}

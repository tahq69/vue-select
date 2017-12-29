import Vue from "vue"

export type UpdateOptions = (options: Options) => void
export type SelectOption = (option: CripSelectOption) => void
export type OnInit = (select: SelectOption) => void
export type OnUpdate = (criteria: string, update: UpdateOptions) => void
export type Options = CripSelectOption[]
export type Install = (vue: typeof Vue, options?: CripSelectOptions) => void
export type Settings = CripSelectConstructorSettings | Options

export interface CripSelectConstructorSettings {
  options?: Options
  async?: boolean
  onUpdate?: OnUpdate
  onInit?: OnInit
}

export interface CripSelectOptions {
  componentPrefix: string
}

export interface CripSelectOption {
  key: string | number
  text: string
  value: any
}

export declare class Plugin {
  constructor(settings: Settings)
  static install: Install
  static version: string

  async: boolean
  onUpdate(callback: OnUpdate): void
  onInit(callback: OnInit): void
}

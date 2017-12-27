import Vue from "vue"

import "./assets/styles.scss"

import { CripSelectConstructorSettings, CripSelectOption, CripSelectOptions } from "../types/plugin"

import install from "./install"

type Settings = CripSelectConstructorSettings | CripSelectOption[]
type DefaultOption = CripSelectOption | Promise<CripSelectOption>
type UpdateCallback = (criteria: string) => CripSelectOption[]

export default class CripVueSelect {
  public static install: (vue: typeof Vue, options?: CripSelectOptions) => void
  public static version: string
  public async: boolean

  private options: CripSelectOption[] | undefined
  private onInitMethod: DefaultOption | undefined
  private onUpdateMethod: UpdateCallback | undefined

  constructor(settings: Settings) {
    if (Array.isArray(settings)) {
      this.async = false
      this.options = settings
    } else {
      this.async = settings.async || false
      this.onInitMethod = settings.onInit
      this.onUpdateMethod = settings.onUpdate
      this.options = settings.options
    }
  }

  public onUpdate(callback: UpdateCallback): void {
    this.onUpdateMethod = callback
  }

  public onInit(selected: DefaultOption): void {
    this.onInitMethod = selected
  }
}

CripVueSelect.install = install
CripVueSelect.version = "__VERSION__"

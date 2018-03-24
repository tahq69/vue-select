import Vue from "vue"

import "./assets/styles.scss"
import emitter from "./emitter"
import { log } from "./help"
import install from "./install"

import {
  CriteriaChanged,
  Install,
  Options,
  SelectOption,
  Settings,
} from "$/plugin"

export default class CripVueSelect<T = any> {
  public static install: Install
  public static version: string

  public loading: boolean[]

  public async = false
  public options: Options<T>
  public onCriteriaChangeStack: Array<CriteriaChanged<T>> = []

  constructor(settings: Settings<T>) {
    log("debug", "CripVueSelect(settings)", { settings })

    this.loading = []
    if (Array.isArray(settings)) {
      this.options = settings
      return
    }

    this.options = settings.options || []

    if (settings.onCriteriaChange) {
      log("debug", "CripVueSelect(settings)", "async")
      this.async = true
      this.onCriteriaChangeStack.push(settings.onCriteriaChange)
    }
  }

  public onCriteriaChange(action: CriteriaChanged<T>): void {
    this.onCriteriaChangeStack.push(action)
  }

  public addOption(options: Options<T> | SelectOption<T>): void {
    if (Array.isArray(options)) this.options.concat(options)
    else this.options.push(options)
  }

  public removeOption(option: SelectOption<T>): void {
    this.options = this.options.filter(o => o === option ? false : true)
  }

  public selectOption(option: SelectOption<T>): void {
    emitter.$emit("select-option", option)
  }
}

CripVueSelect.install = install
CripVueSelect.version = "__VERSION__"

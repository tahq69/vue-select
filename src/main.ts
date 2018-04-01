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
    log("debug", "CripVueSelect.onCriteriaChange(action)", { action })
    this.onCriteriaChangeStack.push(action)
  }

  public addOption(options: Options<T> | SelectOption<T>): void {
    log("debug", "CripVueSelect.addOption(options)", { options })
    if (Array.isArray(options))
      options.forEach(o => this.addSingleOption(o))
    else
      this.addSingleOption(options)
  }

  public setOptions(options: Options<T>) {
    log("debug", "CripVueSelect.setOptions(options)", { options })
    this.options = options
  }

  public removeOption(option: SelectOption<T>): void {
    log("debug", "CripVueSelect.removeOption(option)", { option })
    this.options = this.options.filter(o => o === option ? false : true)
  }

  public selectOption(option: SelectOption<T>): void {
    log("debug", "CripVueSelect.selectOption(option)", { option })
    emitter.$emit("select-option", option)
  }

  private addSingleOption(option: SelectOption<T>): void {
    if (this.options.filter((o => o.key === option.key)).length > 0) {
      log("warn", `Duplicate key detected: '${option.key}'. This may cause an update error.`)
      return
    }

    this.options.push(option)
  }
}

CripVueSelect.install = install
CripVueSelect.version = "__VERSION__"

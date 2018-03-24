import Vue from "vue"

import "./assets/styles.scss"
import install from "./install"

import {
  CriteriaChanged,
  Install,
  Options,
  Settings,
} from "$/plugin"

export default class CripVueSelect {
  public static install: Install
  public static version: string

  public loading: boolean[]

  public async = false
  public options: Options
  public onCriteriaChange: CriteriaChanged[] = []

  constructor(settings: Settings) {
    this.loading = []
    if (Array.isArray(settings)) {
      this.options = settings
      return
    }

    this.options = settings.options || []

    if (settings.onCriteriaChange) {
      this.async = true
      this.onCriteriaChange.push(settings.onCriteriaChange)
    }
  }
}

CripVueSelect.install = install
CripVueSelect.version = "__VERSION__"

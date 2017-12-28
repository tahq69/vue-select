import Vue from "vue"

import "./assets/styles.scss"
import install from "./install"

import {
  CripSelectOption,
  CripSelectOptions,
  Install,
  OnInit,
  OnUpdate,
  Options,
  Settings,
} from "../types/plugin"


export default class CripVueSelect {
  public static install: Install
  public static version: string

  public async: boolean
  public loading: boolean[]

  private options: Options
  private onInitMethod: OnInit | undefined
  private onUpdateMethod: OnUpdate | undefined

  constructor(settings: Settings) {
    this.loading = []
    if (Array.isArray(settings)) {
      this.async = false
      this.options = settings
    } else {
      this.async = settings.async || false
      this.onInitMethod = settings.onInit
      this.onUpdateMethod = settings.onUpdate
      this.options = settings.options || []
    }
  }

  public onUpdate(callback: OnUpdate): void {
    this.onUpdateMethod = callback
  }

  public onInit(callback: OnInit): void {
    this.onInitMethod = callback
  }

  public init(select: (opt: CripSelectOption) => void): void {
    if (this.onInitMethod) {
      this.loading.push(true)

      this.onInitMethod(option => {
        this.loading.splice(0, 1)
        this.options.push(option)
        select(option)
      })
    }
  }

  public update(criteria: string): void {
    if (this.onUpdateMethod) {
      this.loading.push(true)

      this.onUpdateMethod(criteria, options => {
        this.loading.splice(0, 1)
        this.options = options
      })
    }
  }
}

CripVueSelect.install = install
CripVueSelect.version = "__VERSION__"

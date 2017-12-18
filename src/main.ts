import Vue from "vue"

import "./assets/styles.scss"

import { Options } from "./contracts"
import install from "./install"

export default class CripVueLoading {
  public static install: (vue: typeof Vue, options?: Options) => void
  public static version: string

  private a: string

  public constructor() {
    this.a = "defined value of a"
  }
}

CripVueLoading.install = install
CripVueLoading.version = "__VERSION__"

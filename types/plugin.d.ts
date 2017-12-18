import Vue from "vue"

export interface Options {
  componentPrefix: string
}

export const Plugin: (vue: typeof Vue, options?: Options) => void

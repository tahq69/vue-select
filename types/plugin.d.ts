import Vue from "vue"

export type UpdateOptions<T> = (options: Options<T>) => void
export type SelectOption<T> = (option: CripSelectOption<T>) => void
export type OnInit<T> = (select: SelectOption<T>) => void
export type OnUpdate<T> = (criteria: string, update: UpdateOptions<T>) => void
export type Options<T> = CripSelectOption<T>[]
export type Install = (vue: typeof Vue, options?: CripSelectOptions) => void
export type Settings<T> = CripSelectConstructorSettings<T> | Options<T>

export interface CripSelectConstructorSettings<T = any> {
  options?: Options<T>
  async?: boolean
  onUpdate?: OnUpdate<T>
  onInit?: OnInit<T>
}

export interface CripSelectOptions {
  componentPrefix: string
}

export interface CripSelectOption<T = any> {
  key: string | number
  text: string
  value: T
}

export declare class Plugin<T = any> {
  constructor(settings: Settings<T>)
  static install: Install
  static version: string

  async: boolean
  onUpdate(callback: OnUpdate<T>): void
  onInit(callback: OnInit<T>): void
}

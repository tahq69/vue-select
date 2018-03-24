import Vue from "vue"

export type OptionKey = string | number
export type Options<T = any> = SelectOption<T>[]
export type SetAvailableOptions<T = any> = (options: Options<T>) => void
export type CriteriaChanged<T = any> = (criteria: string, setOptions: SetAvailableOptions<T>) => void
export type Install = (vue: typeof Vue, options?: CripSelectInstallSettings) => void
export type Settings<T = any> = CripSelectConstructorSettings<T> | Options<T>

export interface SelectOption<T = any> {
  key: OptionKey
  text: string
  value: T
}

export interface CripSelectInstallSettings {
  componentPrefix: string
}

export interface CripSelectConstructorSettings<T = any> {
  options?: Options<T>
  onCriteriaChange?: CriteriaChanged<T>
}

export declare class Plugin<T = any> {
  constructor(settings: Settings<T>)
  static install: Install
  static version: string

  onCriteriaChange(action: CriteriaChanged<T>): void
  addOption(options: Options<T> | SelectOption<T>): void
  removeOption(option: SelectOption<T>): void
  selectOption(option: SelectOption<T>): void
}

import _vue from "vue"
import Select from "./Select.vue"

export interface IOptions {
  componentPrefix: string
}

// tslint:disable-next-line:variable-name
export default function(Vue: typeof _vue, options?: IOptions) {
  const defaults = { componentPrefix: "crip" }
  const parameters = Object.assign(defaults, options)

  Vue.component(`${parameters.componentPrefix}-select`, Select)
}

import Vue, { VNode } from "vue"
import { CripSelectOption } from "../../types/plugin"

import { highlight } from "../help"

export default function(vue: typeof Vue) {
  return vue.extend({
    name: "CripOption",

    template: `
      <li>
        <a @click.prevent="select"
           v-html="text"
           href="#"></a>
      </li>
    `,

    props: {
      option: { type: Object, required: true },
      criteria: { type: String, required: true },
    },

    computed: {
      text(): string {
        return highlight(this.option.text, this.criteria)
      },
    },

    methods: {
      select() {
        this.$emit("select", this.option)
      },
    },
  })
}

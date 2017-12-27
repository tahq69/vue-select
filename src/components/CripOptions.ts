import Vue, { VNode } from "vue"
import { CripSelectOption } from "../../types/plugin"

import CripOption from "./CripOption"

export default function(vue: typeof Vue) {
  return vue.extend({
    name: "CripOptions",

    components: { CripOption: CripOption(vue) },

    template: `
      <ul>
        <CripOption v-for="option in options"
                    :key="option.key"
                    :class="{ 'active': isActive(option) }"
                    :option="option"
                    :criteria="criteria"
                    @select="select" />

        <li v-if="options.length === 0" class="disabled">
          <a @click.prevent="() => null" href="#">No data</a>
        </li>
      </ul>
    `,

    props: {
      options: { type: Array, required: true },
      criteria: { type: String, required: true },
      current: { type: Number, required: true },
    },

    computed: {
      currentValue(): CripSelectOption {
        return this.options[this.current] || { key: 0 }
      },
    },

    methods: {
      select(option: CripSelectOption) {
        this.$emit("select", option)
      },

      isActive(option: CripSelectOption) {
        return this.currentValue.key === option.key
      },
    },
  })
}

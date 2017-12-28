import Vue, { VNode } from "vue"
import { CripSelectOption } from "../../types/plugin"

export default function(vue: typeof Vue) {
  return vue.extend({
    name: "CripTags",

    template: `
      <div class="input-group-btn crip-tags"
           v-if="show">
        <button v-for="tag in tags"
                :key="tag.key"
                @click="remove(tag)"
                title="Remove"
                class="btn btn-default"
                type="button">{{ tag.text }}</button>
      </div>
    `,

    props: {
      tags: { type: Array, required: true },
    },

    computed: {
      show(): boolean {
        return this.tags.length > 0
      },
    },

    methods: {
      remove(option: CripSelectOption) {
        this.$emit("remove", option)
      },
    },
  })
}

import Vue, { VNode } from "vue"

export default function(vue: typeof Vue) {
  return vue.extend({
    name: "CripVueSelect",

    render(h): VNode {
      return h("div", "Some content of Select.ts")
    },

    computed: {},

    data() {
      return {}
    },

    methods: {},

    created() {
      // TODO:
    },
  })
}

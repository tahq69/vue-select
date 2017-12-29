<script lang="ts">
import Vue from "vue"

import { highlight } from "./../help"

export default Vue.extend({
  name: "CripOption",

  props: {
    criteria: { type: String, required: true },
    option: { type: Object, required: true },
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
</script>

<template>
  <li>
    <a @click.prevent="select"
       v-html="text"
       href="#"
       class="crip-option"></a>
  </li>
</template>

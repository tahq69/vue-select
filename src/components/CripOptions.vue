<script lang="ts">
// tslint:disable:object-literal-sort-keys
import Vue from "vue"

import { SelectOption } from "$/plugin"

import CripOption from "./CripOption.vue"

export default Vue.extend({
  name: "CripOptions",

  components: { CripOption },

  props: {
    options: { type: Array, required: true },
    criteria: { type: String, required: true },
    current: { type: Number, required: true },
  },

  computed: {
    currentValue(): SelectOption | undefined {
      return this.options[this.current] || undefined
    },
  },

  methods: {
    select(option: SelectOption) {
      this.$emit("select", option)
    },

    isActive(option: SelectOption) {
      if (!this.currentValue) return false
      return this.currentValue.key === option.key
    },
  },
})
</script>

<template>
  <div class="dropdown-menu crip-options">
    <CripOption v-for="option in options"
                :key="option.key"
                :class="{'active': isActive(option)}"
                :option="option"
                :criteria="criteria"
                @select="select" />

    <a v-if="options.length === 0"
       @click.prevent="() => null"
       class="disabled dropdown-item"
       href="#">
      <slot><!-- default slot --></slot>
    </a>
  </div>
</template>

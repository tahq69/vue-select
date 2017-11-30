<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import { highlight } from "./../helpers"
import CripOption from "./../Option"

@Component({ name: "CripOption" })
export default class COption<T> extends Vue {
  @Prop({ type: Object, required: true })
  public option: CripOption<T>

  @Prop({ type: String, required: true })
  public criteria: string

  public select(option: CripOption<T>) {
    this.$emit("select", option)
  }
}
</script>

<template>
  <li>
    <a
        @click.prevent="select(option)"
        v-html="option.highlightedText(criteria)"
        href="#"
    ></a>
  </li>
</template>


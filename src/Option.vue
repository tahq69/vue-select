<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import { IOption } from "./Contracts"
import { highlight } from "./helpers"

@Component({ name: "CripOption" })
export default class CripOption extends Vue {
  @Prop({ type: Object, required: true })
  public option: IOption

  @Prop({ type: String, required: true })
  public text: string

  @Prop({ type: String, required: true })
  public criteria: string

  public get optionText() {
    return highlight(this.text, this.criteria)
  }

  public select(option: IOption) {
    this.$emit("select", option)
  }

  @Watch("criteria")
  private onCriteriaUpdate(criteria) {
    this.$emit("criteriaValue", criteria)
  }
}
</script>

<template>
  <li>
    <a
        @click.prevent="select(option)"
        v-html="optionText"
        href="#"
    ></a>
  </li>
</template>


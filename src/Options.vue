<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import CripOption from "./Option.vue"

import { IOption } from "./Contracts"
import { highlight } from "./helpers"

@Component({
  components: { CripOption },
  name: "CripOptions",
})
export default class CripOptions extends Vue {
  @Prop({ type: Array, required: true })
  public options: IOption[]

  @Prop({ type: String, required: true })
  public criteria: string

  @Prop({ type: Function, required: true })
  public text: (o: IOption) => string

  @Prop({ type: Number, required: true })
  public current: number

  public select(option: IOption) {
    this.$emit("select", option)
  }

  public isActive(index: number) {
    return index === this.current
  }
}
</script>

<template>
  <ul>
    <CripOption
        v-for="(option, index) in options"
        :key="option.text"
        :class="{'active': isActive(index)}"
        :selectOption="selectOption"
        :text="text(option)"
        :option="option"
        :criteria="criteria"
        @select="select"
    />

    <li v-if="options.length === 0" class="disabled">
      <a @click.prevent="()=>null" href="#">No data</a>
    </li>
  </ul>
</template>


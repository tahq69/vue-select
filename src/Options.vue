<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import Option from "./Option"
import CripOption from "./Option.vue"

@Component({
  components: { CripOption },
  name: "CripOptions",
})
export default class CripOptions<T> extends Vue {
  @Prop({ type: Array, required: true })
  public options: Option<T>[]

  @Prop({ type: String, required: true })
  public criteria: string

  @Prop({ type: Number, required: true })
  public current: number

  public get currentValue() {
    return this.options[this.current] || { key: 0 }
  }

  public select(option: Option<T>) {
    this.$emit("select", option)
  }
}
</script>

<template>
  <ul>
    <CripOption
        v-for="option in options"
        :key="option.key"
        :class="{'active': option.isActive(currentValue.key)}"
        :selectOption="selectOption"
        :option="option"
        :criteria="criteria"
        @select="select"
    />

    <li v-if="options.length === 0" class="disabled">
      <a @click.prevent="()=>null" href="#">No data</a>
    </li>
  </ul>
</template>


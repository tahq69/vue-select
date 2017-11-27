<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

@Component({ name: "CripSelect" })
export default class CripSelect extends Vue {
  @Prop({ type: String, default: null })
  public value: string

  @Prop({ type: Array, default: [] })
  public options: string[]

  public updateValue(value: string): void {
    this.$emit("input", value)
  }

  public selectOption(option: string): void {
    this.updateValue(option)
  }

  @Watch("text")
  private onTextChanged(newText, oldText): void {
    // tslint:disable-next-line:no-console
    console.log({ newText, oldText })
  }
}
</script>

<template>
  <div class="crip-select">
    <input
        class="form-control crip-input"
        ref="input"
        type="text"
        :value="value"
        @input="updateValue($event.target.value)"
    />

    <ul class="crip-options">
      <li
          v-for="option in options"
          :key="option"
          @click.prevent="selectOption(option)"
          class="clicable"
      >{{ option }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.crip-select {
  .crip-input {
    /*   */
  }
  .crip-options {
    list-style-type: none;
    padding: 0;
  }

  .clicable {
    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }
  }
}
</style>

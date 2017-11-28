<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import { IOption } from "./Contracts"

@Component({ name: "CripSelect" })
export default class CripSelect extends Vue {
  @Prop({ default: null })
  public value?: IOption

  @Prop({ type: Array, default: [] })
  public options: IOption[]

  @Prop({ type: Function, default: (o: IOption) => o.text })
  public text: (o: IOption) => string

  public criteria: string

  public isOpen: boolean = false

  private current: number = -1

  private checkpoint: IOption = null

  public get dropdownOptions() {
    return this.options
  }

  public onFocus(e: Event) {
    this.isOpen = true
  }

  public onBlur(e: Event) {
    // Close dropdown only when click binding is already propongadated.
    setTimeout(() => (this.isOpen = false), 100)
  }

  public onCtrlSpace(e: Event) {
    this.isOpen = true
  }

  public onEscape(e: Event) {
    // setup last checkpoint as current one
    if (this.dropdownOptions.indexOf(this.checkpoint) === -1) {
      this.options.push(this.checkpoint)
    }

    this.criteria = this.checkpoint.text
    this.current = this.dropdownOptions.indexOf(this.checkpoint)
    this.isOpen = false
  }

  public onEnter(e: Event) {
    if (this.isOpen) {
      // Avoid form submit if dropdown is open and selection in list is on
      // some of the elements.
      e.preventDefault()
    }

    this.detectOptionForSelect()
  }

  public onDown(e: Event) {
    if (this.current < this.dropdownOptions.length - 1) {
      this.current++
    }
  }

  public onUp(e: Event) {
    if (this.current > 0) {
      this.current--
    }
  }

  public isActive(index) {
    return index === this.current
  }

  public selectOption(option: IOption): void {
    this.isOpen = false

    this.createCheckpoint(option)
    this.criteria = option.text
    this.$emit("input", option.value)
  }

  private detectOptionForSelect() {
    if (this.current === -1) {
      this.addTag()
      return
    }

    this.selectOption(this.dropdownOptions[this.current])
  }

  private addTag() {
    // TODO: add tagging option for select
  }

  private createCheckpoint(option: IOption) {
    this.checkpoint = option
  }

  private created() {
    // TODO: get async value or value and create checkpoint from it
  }

  @Watch("criteria")
  private onCriteriaChanged(newCriteria, oldCriteria): void {
    // tslint:disable-next-line:no-console
    console.log({ newCriteria, oldCriteria })
    // TODO: if is async component we should call for new data for options list
  }
}
</script>

<template>
  <div
      :class="{'open': isOpen}"
      class="crip-select dropdown"
  >
    <input
        class="form-control crip-input"
        type="text"
        :value="criteria"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.space.ctrl="onCtrlSpace"
        @keydown.esc="onEscape"
        @keydown.enter="onEnter"
        @keydown.down.prevent="onDown"
        @keydown.up.prevent="onUp"
    />

    <ul class="dropdown-menu crip-options">
      <li
          v-for="(option, index) in dropdownOptions"
          :key="option.text"
          :class="{'active': isActive(index)}"
      >
        <a @click.prevent="selectOption(option)" href="#">
          {{ text(option) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.crip-select {
  .crip-options {
    width: 100%;
  }

  .crip-options {
    margin-top: 0px;
  }

  &.open {
    .crip-input {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    .crip-options {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }
}
</style>

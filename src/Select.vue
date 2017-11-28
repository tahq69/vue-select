<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import Options from "./Options.vue"

import { IOption } from "./Contracts"
import { highlight, stripHTML } from "./helpers"

@Component({
  components: { Options },
  name: "CripSelect",
})
export default class CripSelect extends Vue {
  @Prop({ default: null })
  public value?: IOption

  @Prop({ type: Array, default: [] })
  public options: IOption[]

  @Prop({ type: Function, default: (o: IOption) => o.text })
  public text: (o: IOption) => string

  @Prop({ type: Number, default: 12 })
  public count: number

  public criteria: string = ""

  public isOpen: boolean = false

  private current: number = -1

  private checkpoint: IOption = null

  public get filteredOptions() {
    if (this.criteria.trim() === "") return this.options

    const criteria = this.criteria.toLowerCase()

    return this.options.filter(option => {
      const text = this.text(option).toLowerCase()
      const clearText = stripHTML(text)
      return clearText.indexOf(criteria) > -1
    })
  }

  public get dropdownOptions() {
    if (this.filteredOptions.length > 0) {
      const len = this.filteredOptions.length
      const visibleCount = len >= this.count ? this.count : len
      return this.filteredOptions.slice(0, visibleCount)
    }

    return []
  }

  public onInput(criteria: string) {
    this.isOpen = true
    this.current = -1
    this.criteria = criteria
    // TODO: if is async component we should call for new data for options list
  }

  public onFocus(e: Event) {
    this.isOpen = true
  }

  public onBlur(e: Event) {
    // Close dropdown only when click binding is already propongadated.
    setTimeout(() => {
      this.isOpen = false
      this.criteria = this.checkpoint ? this.clearText(this.checkpoint) : ""
    }, 100)
  }

  public onCtrlSpace(e: Event) {
    this.isOpen = true
  }

  public onEscape(e: Event) {
    // setup last checkpoint as current one
    if (this.dropdownOptions.indexOf(this.checkpoint) === -1) {
      this.options.push(this.checkpoint)
    }

    this.criteria = this.clearText(this.checkpoint)
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
    this.criteria = this.clearText(this.checkpoint)
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

  private clearText(option: IOption) {
    return stripHTML(this.text(option))
  }

  private created() {
    // TODO: get async value or value and create checkpoint from it
  }
}
</script>

<template>
  <div
      :class="{'open': isOpen}"
      class="crip-select dropdown"
  >
    <input
        :value="criteria"

        @input="onInput($event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.space.ctrl="onCtrlSpace"
        @keydown.esc="onEscape"
        @keydown.enter="onEnter"
        @keydown.down.prevent="onDown"
        @keydown.up.prevent="onUp"

        type="text"
        class="form-control crip-input"
    />
    <Options
        :options="dropdownOptions"
        :text="text"
        :current="current"
        :criteria="criteria"

        @select="selectOption"

        class="dropdown-menu crip-options"
    />
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

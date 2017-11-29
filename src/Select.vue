<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import Options from "./Options.vue"
import Tags from "./Tags.vue"

import { highlight, stripHTML } from "./helpers"
import CripOption from "./Option"

@Component({
  components: { Options, Tags },
  name: "CripSelect",
})
export default class CripSelect<T> extends Vue {
  @Prop({ type: Array, default: [] })
  public options: T[]

  @Prop({ type: Function, default: value => value })
  public text: (value: T) => string

  @Prop({ type: Number, default: 12 })
  public count: number

  @Prop({ type: Boolean, default: false })
  public tags: boolean

  public cripOptions: CripOption<T>[] = []

  public criteria: string = ""

  public isOpen: boolean = false

  private current: number = -1

  private checkpoint: CripOption<T> = null

  public get filteredOptions() {
    if (this.criteria.trim() === "") return this.cripOptions

    const criteria = this.criteria.toLowerCase()

    return this.cripOptions.filter(option => {
      const text = option.text().toLowerCase()
      const plainText = option.plainText()

      return plainText.indexOf(criteria) > -1
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
      this.criteria = this.checkpoint ? this.checkpoint.plainText() : ""
    }, 100)
  }

  public onCtrlSpace(e: Event) {
    this.isOpen = true
  }

  public onEscape(e: Event) {
    this.criteria = this.checkpoint.plainText()

    // TODO: Assume this is not correct behavior
    // setup last checkpoint as current one
    /*if (this.dropdownOptions.indexOf(this.checkpoint) === -1) {
      this.options.push(this.checkpoint)
    }*/

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

  public selectOption(option: CripOption<T>): void {
    this.isOpen = false

    this.createCheckpoint(option)
    this.criteria = option.plainText()
    this.$emit("input", option.value)
  }

  private detectOptionForSelect() {
    if (this.current === -1 && this.tags === true) {
      this.addTag()

      return
    }

    this.selectOption(this.dropdownOptions[this.current])
  }

  private addTag() {
    // TODO: add tagging option for select
  }

  private createCheckpoint(option: CripOption<T>) {
    this.checkpoint = option
  }

  private created() {
    this.onOptionsChange(this.options)
    // TODO: get async value or value and create checkpoint from it
  }

  @Watch("options")
  private onOptionsChange(options: T[]) {
    this.cripOptions = this.options.map((o: T) => {
      return new CripOption(o, this.text)
    })
  }
}
</script>

<template>
  <div
      :class="{'open': isOpen}"
      class="crip-select dropdown"
  >
    <div class="input-group">
      <Tags
          v-if="tags"
      />
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
    </div>

    <Options
        :options="dropdownOptions"
        :criteria="criteria"
        :current="current"
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

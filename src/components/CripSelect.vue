<script lang="ts">
import Vue from "vue"
import { CripSelectOption, Options } from "./../../types/plugin"

import debounce from "../debounce"
import { uuidv4 } from "../help"
import CripOptions from "./CripOptions.vue"
import CripTags from "./CripTags.vue"

interface Data {
  asyncOptions: Options
  checkpoint: null | CripSelectOption
  criteria: string
  current: number
  isOpen: boolean
  selected: Options
}

function newOption(value: string): CripSelectOption {
  return {
    key: uuidv4(),
    text: value,
    value,
  }
}

export default Vue.extend({
  name: "CripSelect",

  components: { CripOptions, CripTags },

  props: {
    options: {
      type: Array,
      default: () => [],
      validator: (options: any[]) => {
        if (options.length === 0) return true
        if (
          typeof options[0].key === "undefined" ||
          typeof options[0].text === "undefined" ||
          typeof options[0].value === "undefined"
        ) {
          return false
        }

        return true
      },
    },
    clear: { type: Boolean, default: false },
    count: { type: Number, default: 12 },
    multiple: { type: Boolean, default: false },
    settings: { type: Object, default: () => ({}) },
    tags: { type: Boolean, default: false },
  },

  computed: {
    dropdownOptions(): Options {
      const results = this.multiple && this.criteria.length > 0 ? [newOption(this.criteria)] : []

      if (this.options && this.options.length > 0) {
        const options = this.filter(this.options, results)
        return this.mergeWithAsync(options).slice(0, this.count)
      }

      if (this.settings && this.settings.options && this.settings.options.length > 0) {
        const options = this.filter(this.settings.options, results)
        return this.mergeWithAsync(options).slice(0, this.count)
      }

      return this.mergeWithAsync(results).slice(0, this.count)
    },

    isAnyFocused(): boolean {
      return this.current > -1
    },

    canHaveManyTags(): boolean {
      return this.tags && this.multiple
    },

    canHaveOneTag(): boolean {
      return this.tags && !this.multiple
    },
  },

  data(): Data {
    return {
      isOpen: false,
      criteria: "",
      current: -1,
      checkpoint: null,
      selected: [],
      asyncOptions: [],
    }
  },

  methods: {
    detectOptionForSelect(): void {
      if (this.canHaveManyTags && !this.isAnyFocused) {
        this.addTag(newOption(this.criteria))
        return
      }

      if (!this.isAnyFocused && !this.tags) {
        // Ignore selection if there is no element highlighted in options when
        // tags is disabled.
        return
      }

      if (!this.isAnyFocused && this.canHaveOneTag && this.criteria.length > 0) {
        // If single tag is allowed, treat it as simple option, where value is
        // criteria text.
        this.onSelect(newOption(this.criteria))
        return
      }

      const option = this.dropdownOptions[this.current]

      // Select only if we have a value.
      if (option) this.onSelect(option)
    },

    createCheckpoint(option: CripSelectOption): void {
      this.checkpoint = option
    },

    addTag(option: CripSelectOption): void {
      this.selected.push(option)
      this.$emit("input", this.selected.map(opt => opt.value))
      this.criteria = ""

      // Hide dropdown if we select last element in dropdown.
      if (this.dropdownOptions.length === 0) this.isOpen = false
    },

    onTagRemove(option: CripSelectOption): void {
      this.selected.splice(this.selected.indexOf(option), 1)
      this.$emit("input", this.selected.map(opt => opt.value))
    },

    onInput(criteria: string) {
      this.isOpen = true
      this.current = 0
      this.criteria = criteria

      this.debounceInput()
    },

    onSelect(option: CripSelectOption): void {
      if (this.multiple) {
        this.addTag(option)
        return
      }

      this.isOpen = false
      this.createCheckpoint(option)
      this.criteria = option.text
      this.current = this.dropdownOptions.indexOf(option)
      this.$emit("input", option.value)
    },

    onDeselect(): void {
      this.isOpen = false
      this.checkpoint = null
      this.criteria = ""
      this.$emit("input", null)

      // Clear all selected values if tags are enabled.
      this.selected = []
    },

    onFocus(e: Event): void {
      this.isOpen = true
    },

    onBlur(e: Event): void {
      setTimeout(() => {
        // Close dropdown only when click binding is already propongadated.
        this.isOpen = false

        if (this.checkpoint !== null) {
          this.criteria = this.checkpoint.text
        } else if (!this.tags) {
          this.criteria = ""
        }
      }, 100)
    },

    onCtrlSpace(e: Event): void {
      this.isOpen = true
    },

    onEscape(e: Event): void {
      if (this.checkpoint) {
        this.criteria = this.checkpoint.text
        // TODO: Assume this is not correct behavior
        // setup last checkpoint as current one
        /*if (this.dropdownOptions.indexOf(this.checkpoint) === -1) {
          this.options.push(this.checkpoint)
        }*/
        this.current = this.dropdownOptions.indexOf(this.checkpoint)
        this.isOpen = false
        return
      }

      this.criteria = ""
      this.current = -1
      this.isOpen = false
    },

    onEnter(e: Event): void {
      if (this.isOpen) {
        // Avoid form submit if dropdown is open.
        e.preventDefault()
      }

      this.detectOptionForSelect()
    },

    onDown(e: Event): void {
      this.onFocus(e)

      if (this.current < this.dropdownOptions.length - 1) {
        this.current++
      }
    },

    onUp(e: Event): void {
      this.onFocus(e)

      if (this.current > 0) {
        this.current--
      }
    },

    filter(options: Options, systemOptions: Options): Options {
      if (!this.multiple && this.criteria.length < 3) return options

      const results = options.filter(option => {
        // Ignore already selected options for tagging.
        if (this.multiple && this.selected.filter(v => v.key === option.key).length > 0)
          return false

        // Filter by text when value is not selected or criteria i not same as
        // selected value.
        if (!this.checkpoint || this.checkpoint.text !== this.criteria)
          return option.text.indexOf(this.criteria) > -1

        return true
      })

      if (
        systemOptions.length > 0 &&
        results.filter(o => o.text === systemOptions[0].text).length === 0
      ) {
        // Unshift system option only if text does not occurs in defined
        // options.
        results.unshift(systemOptions[0])
      }

      return results
    },

    mergeWithAsync(options: Options): Options {
      return [...options, ...this.asyncOptions]
    },

    asyncUpdate() {
      if (this.settings && this.settings.async && this.settings.update) {
        this.settings.update(this.criteria)
      }
    },

    debounceInput: debounce(function(this: { asyncUpdate: () => void }, e) {
      this.asyncUpdate()
    }, 300),
  },

  mounted() {
    if (this.settings && this.settings.init) {
      this.settings.init((option: CripSelectOption) => {
        this.onSelect(option)
      })
    }

    this.asyncUpdate()
  },
})
</script>

<template>
  <div :class="{'open': isOpen}"
       class="crip-select dropdown">
    <div :class="{'input-group': (multiple && selected.length) || clear}">
      <CripTags :tags="selected"
                @remove="onTagRemove" />

      <input :value="criteria"
             @input="onInput($event.target.value)"
             @focus="onFocus"
             @blur="onBlur"
             @keydown.space.ctrl="onCtrlSpace"
             @keydown.esc="onEscape"
             @keydown.enter="onEnter"
             @keydown.down.prevent="onDown"
             @keydown.up.prevent="onUp"
             type="text"
             class="form-control crip-input" />

      <span v-if="clear"
            class="input-group-btn crip-close-btn">
        <button @click.prevent="onDeselect"
                class="btn btn-default"
                type="button">
          ×
        </button>
      </span>
    </div>

    <CripOptions :options="dropdownOptions"
                 :criteria="criteria"
                 :current="current"
                 @select="onSelect" />
  </div>
</template>


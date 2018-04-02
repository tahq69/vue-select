<script lang="ts">
// tslint:disable:object-literal-sort-keys
import Vue from "vue"

import { Options, SelectOption } from "$/plugin"

import ClickOutside from "@/directives/ClickOutside"
import debounce from "../debounce"
import emitter from "../emitter"
import { log, uuidv4 } from "../help"
import CripVueSelect from "../main"
import CripOptions from "./CripOptions.vue"
import CripTags from "./CripTags.vue"

function newOption(value: string): SelectOption {
  return {
    key: uuidv4(),
    text: value,
    value,
  }
}

export default Vue.extend({
  name: "CripSelect",

  components: { CripOptions, CripTags },

  directives: { ClickOutside },

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
    settings: { type: CripVueSelect, required: false },
    id: { type: String, default: `crip-select-${uuidv4()}` },
    tags: { type: Boolean, default: false },
    value: { type: [String, Number, Boolean, Object, Array], required: false },
    inputClass: { type: [String, Array, Object], required: false },
  },

  computed: {
    tagRequired(): boolean {
      return this.tags && this.criteria.length > 0
    },

    systemOptions(): SelectOption[] {
      return this.tagRequired ? [newOption(this.criteria)] : []
    },

    hasOptions(): boolean {
      return this.options && this.options.length > 0
    },

    hasSettingsOptions(): boolean {
      return this.settings && this.settings.options && this.settings.options.length > 0
    },

    dropdownOptions(): Options {
      if (this.hasOptions) return this.filter(this.options).slice(0, this.count)

      if (this.hasSettingsOptions) return this.filter(this.settings.options).slice(0, this.count)

      return this.systemOptions
    },

    isAnyFocused(): boolean {
      return this.current > -1
    },
  },

  data() {
    return {
      checkpoint: null as SelectOption | null,
      criteria: "" as string,
      current: -1 as number,
      isOpen: false as boolean,
      selected: [] as Options,
    }
  },

  methods: {
    createCheckpoint(option: SelectOption): void {
      log("debug", this.id, "createCheckpoint(option)", { option })
      this.checkpoint = option
    },

    addTag(option: SelectOption): void {
      log("debug", this.id, "addTag(option)", { option })
      this.selected.push(option)
      this.$emit("input", this.selected.map(opt => opt.value))
      this.criteria = ""

      // Hide dropdown if we select last element in dropdown.
      if (this.dropdownOptions.length === 0) this.isOpen = false
    },

    onTagRemove(option: SelectOption): void {
      log("debug", this.id, "onTagRemove(option)", { option })
      this.selected.splice(this.selected.indexOf(option), 1)
      this.$emit("input", this.selected.map(opt => opt.value))
    },

    onInput(criteria: string) {
      log("debug", this.id, "onInput(criteria)", { criteria })
      this.isOpen = true
      this.current = 0
      this.criteria = criteria

      this.debounceInput()
    },

    onSelect(option: SelectOption): void {
      log("debug", this.id, "onSelect(option)", { option, multiple: this.multiple })
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
      log("debug", this.id, "onDeselect()", {})
      this.isOpen = false
      this.current = -1
      this.checkpoint = null
      this.criteria = ""
      this.$emit("input", null)

      // Clear all selected values if tags are enabled.
      this.selected = []
    },

    onFocus(e: Event): void {
      log("debug", this.id, "onFocus()", {})
      this.isOpen = true
    },

    onBlur(e: Event): void {
      log("debug", this.id, "onBlur()", {})
      this.isOpen = false

      if (this.checkpoint !== null) {
        this.criteria = this.checkpoint.text
      } else if (!this.tags) {
        this.criteria = ""
      }
    },

    onCtrlSpace(e: Event): void {
      log("debug", this.id, "onCtrlSpace()", {})
      this.isOpen = true
    },

    onEscape(e: Event): void {
      log("debug", this.id, "onEscape(e)", { e, checkpoint: this.checkpoint })
      if (this.checkpoint) {
        this.criteria = this.checkpoint.text
        this.current = this.dropdownOptions.indexOf(this.checkpoint)
        this.isOpen = false
        return
      }

      this.criteria = ""
      this.current = -1
      this.isOpen = false
    },

    onEnter(e: Event): void {
      log("debug", this.id, "onEnter(e)", {
        e,
        isOpen: this.isOpen,
        isAnyFocused: this.isAnyFocused,
        tags: this.tags,
        current: this.current,
      })

      if (!this.isOpen) return

      // Avoid form submit if dropdown is open.
      e.preventDefault()

      if (!this.isAnyFocused && !this.tags) {
        // Ignore selection if there is no element highlighted in options when
        // tags is disabled.
        return
      }

      const option = this.dropdownOptions[this.current]

      // Select only if we have a value.
      if (option) this.onSelect(option)
    },

    onDown(e: Event): void {
      log("debug", this.id, "onDown(e)", { e })
      this.onFocus(e)

      if (this.current < this.dropdownOptions.length - 1) {
        this.current++
      }
    },

    onUp(e: Event): void {
      log("debug", this.id, "onUp(e)", { e })
      this.onFocus(e)

      if (this.current > 0) {
        this.current--
      }
    },

    filter(options: Options): Options {
      if (!this.multiple && this.criteria.length < 3) {
        log("debug", this.id, "filter(options)", { options })
        return options
      }

      const results = options.filter(option => {
        // Ignore already selected options for tagging.
        if (this.multiple && this.selected.filter(v => v.key === option.key).length > 0)
          return false

        // Filter by text when value is not selected or criteria is not same as
        // selected value.
        if (!this.checkpoint || this.checkpoint.text !== this.criteria)
          return option.text.indexOf(this.criteria) > -1

        return true
      })

      const criteriaInResults = results.filter(o => o.text === this.criteria)
      if (this.tagRequired && criteriaInResults.length === 0) {
        // Unshift system option only if text does not occurs in defined
        // options.
        results.unshift(newOption(this.criteria))
      }

      log("debug", this.id, "filter(options)", { options, results, tagRequired: this.tagRequired })
      return results
    },

    setupFromValue(value: any) {
      const isValidSetup = typeof value !== "undefined" && (!this.settings || !this.settings.async)
      const isMultiselectValue = this.multiple && Array.isArray(value)

      log("debug", this.id, "setupFromValue(value)", { value, isValidSetup, isMultiselectValue })

      if (isValidSetup) {
        this.dropdownOptions.forEach(opt => {
          if (isMultiselectValue) value.forEach((val: any) => this.selectByValue(opt, val))
          else this.selectByValue(opt, value)
        })
      }
    },

    selectByValue(opt: SelectOption, value: any) {
      const areEqual = opt.value === value

      log("debug", this.id, "setupFromValue(value).compare", { value, opt, areEqual })

      if (areEqual) this.onSelect(opt)
    },

    asyncUpdate() {
      log("debug", this.id, "asyncUpdate()", { settings: this.settings, criteria: this.criteria })
      if (this.settings && this.settings.async) {
        // Reset options to emty array.
        this.settings.setOptions([])
        const id = uuidv4()

        this.settings.onCriteriaChangeStack.forEach(action => {
          log("debug", this.id, "asyncUpdate.call", { action, criteria: this.criteria })
          action(
            this.criteria,
            (options, responseId) => {
              log("debug", this.id, "asyncUpdate.call.merge", { action, options, id, responseId })
              // Ignore received results if not from current action identifier.
              if (typeof responseId === "string" && responseId !== id) return

              // Merge data when received. This allows make async requests to
              // fetch data from multiple sources.
              this.settings.addOption(options)
            },
            id
          )
        })
      }
    },

    debounceInput: debounce(function(this: { asyncUpdate: () => void }, e) {
      this.asyncUpdate()
    }, 300),
  },

  mounted() {
    log("debug", this.id, "CripSelect.vue", "mounted")
    this.setupFromValue(this.value)

    emitter.$on("select-option", (option: SelectOption) => this.onSelect(option))
  },

  watch: {
    value(newVal: any, oldVal: any) {
      log("debug", this.id, "CripSelect.value.change", { newVal, oldVal })
      this.setupFromValue(newVal)
    },
  },
})
</script>

<template>
  <div :class="{'open show': isOpen}"
       class="crip-select dropdown">
    <div :class="{'input-group': (multiple && selected.length) || clear}">
      <CripTags :tags="selected"
                @remove="onTagRemove" />

      <input :value="criteria"
             autocomplete="off"
             @input="onInput($event.target.value)"
             @focus="onFocus"
             @keydown.space.ctrl="onCtrlSpace"
             @keydown.esc="onEscape"
             @keydown.enter="onEnter"
             @keydown.down.prevent="onDown"
             @keydown.up.prevent="onUp"
             v-click-outside="onBlur"
             type="text"
             :id="id"
             class="form-control crip-input"
             :class="inputClass" />

      <span v-if="clear"
            class="input-group-btn input-group-prepend crip-close-btn">
        <button @click.prevent="onDeselect"
                class="btn btn-default btn-outline-secondary"
                type="button">
          ×
        </button>
      </span>

      <slot name="feedback"
            class="crip-select-feedback"></slot>
    </div>

    <CripOptions :options="dropdownOptions"
                 :criteria="criteria"
                 :current="current"
                 :class="{'open show': isOpen}"
                 @select="onSelect">
      <slot>
        <!-- default slot -->
      </slot>
    </CripOptions>
  </div>
</template>


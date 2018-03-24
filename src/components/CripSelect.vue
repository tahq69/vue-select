<script lang="ts">
// tslint:disable:object-literal-sort-keys
import Vue from "vue"

import { Options, SelectOption } from "$/plugin"

import ClickOutside from "@/directives/ClickOutside"
import debounce from "../debounce"
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
      log("debug", "createCheckpoint(option)", { option })
      this.checkpoint = option
    },

    addTag(option: SelectOption): void {
      log("debug", "addTag(option)", { option })
      this.selected.push(option)
      this.$emit("input", this.selected.map(opt => opt.value))
      this.criteria = ""

      // Hide dropdown if we select last element in dropdown.
      if (this.dropdownOptions.length === 0) this.isOpen = false
    },

    onTagRemove(option: SelectOption): void {
      log("debug", "onTagRemove(option)", { option })
      this.selected.splice(this.selected.indexOf(option), 1)
      this.$emit("input", this.selected.map(opt => opt.value))
    },

    onInput(criteria: string) {
      log("debug", "onInput(criteria)", { criteria })
      this.isOpen = true
      this.current = 0
      this.criteria = criteria

      this.debounceInput()
    },

    onSelect(option: SelectOption): void {
      log("debug", "onSelect(option)", { option, multiple: this.multiple })
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
      log("debug", "onDeselect()", {})
      this.isOpen = false
      this.current = -1
      this.checkpoint = null
      this.criteria = ""
      this.$emit("input", null)

      // Clear all selected values if tags are enabled.
      this.selected = []
    },

    onFocus(e: Event): void {
      log("debug", "onFocus()", {})
      this.isOpen = true
    },

    onBlur(e: Event): void {
      log("debug", "onBlur()", {})
      this.isOpen = false

      if (this.checkpoint !== null) {
        this.criteria = this.checkpoint.text
      } else if (!this.tags) {
        this.criteria = ""
      }
    },

    onCtrlSpace(e: Event): void {
      log("debug", "onCtrlSpace()", {})
      this.isOpen = true
    },

    onEscape(e: Event): void {
      log("debug", "onEscape(e)", { e, checkpoint: this.checkpoint })
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
      log("debug", "onEnter(e)", {
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
      log("debug", "onDown(e)", { e })
      this.onFocus(e)

      if (this.current < this.dropdownOptions.length - 1) {
        this.current++
      }
    },

    onUp(e: Event): void {
      log("debug", "onUp(e)", { e })
      this.onFocus(e)

      if (this.current > 0) {
        this.current--
      }
    },

    filter(options: Options): Options {
      if (!this.multiple && this.criteria.length < 3) {
        log("debug", "filter(options)", { options })
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

      log("debug", "filter(options)", { options, results, tagRequired: this.tagRequired })
      return results
    },

    setupFromValue(value: any) {
      log("debug", "setupFromValue(value)", { value })
      if (typeof value !== "undefined" && (!this.settings || !this.settings.async)) {
        this.dropdownOptions.forEach(opt => {
          if (opt.value === value) this.onSelect(opt)
        })
      }
    },

    asyncUpdate() {
      log("debug", "asyncUpdate()", { settings: this.settings })
      if (this.settings && this.settings.async) {
        const resultOptions: SelectOption[] = []
        this.settings.onCriteriaChange.forEach(listenner => {
          listenner(this.criteria, options => resultOptions.concat(options))
        })

        log("debug", "asyncUpdate()", { resultOptions })
        this.settings.options = resultOptions
      }
    },

    debounceInput: debounce(function(this: { asyncUpdate: () => void }, e) {
      this.asyncUpdate()
    }, 300),
  },

  mounted() {
    log("debug", "CripSelect.vue", "mounted")
    this.setupFromValue(this.value)
    this.asyncUpdate()
  },

  watch: {
    value(newVal: any, oldVal: any) {
      log("debug", "CripSelect.value.change", { newVal, oldVal })
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
             class="form-control crip-input" />

      <span v-if="clear"
            class="input-group-btn input-group-prepend crip-close-btn">
        <button @click.prevent="onDeselect"
                class="btn btn-default btn-outline-secondary"
                type="button">
          ×
        </button>
      </span>
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


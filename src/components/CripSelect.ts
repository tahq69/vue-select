import Vue, { VNode } from "vue"
import { CripSelectOption } from "./../../types/plugin"

import { uuidv4 } from "../help"
import CripOptions from "./CripOptions"
import CripTags from "./CripTags"

interface Data {
  isOpen: boolean
  criteria: string
  current: number
  checkpoint: null | CripSelectOption
  selected: CripSelectOption[]
}

function newOption(value: string): CripSelectOption {
  return {
    key: uuidv4(),
    text: value,
    value,
  }
}

export default function(vue: typeof Vue) {
  return vue.extend({
    name: "CripSelect",

    components: { CripOptions: CripOptions(vue), CripTags: CripTags(vue) },

    template: `
      <div :class="{'open': isOpen}"
           class="crip-select dropdown">
        <div :class="{'input-group': (multiple && selected.length) || clear}">
          <CripTags :tags="selected"
                    @remove="onTagRemove"/>

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
    `,

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
      settings: { type: Object, default: () => ({}) },
      count: { type: Number, default: 12 },
      tags: { type: Boolean, default: false },
      multiple: { type: Boolean, default: false },
      clear: { type: Boolean, default: false },
    },

    computed: {
      dropdownOptions(): CripSelectOption[] {
        const results = this.tags && this.criteria.length > 0 ? [newOption(this.criteria)] : []

        if (this.options && this.options.length > 0) {
          return this.filter(this.options, results)
        }

        if (this.settings && this.settings.options.length > 0) {
          return this.filter(this.settings.options, results)
        }

        return results
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

      addTag(option: CripSelectOption) {
        this.selected.push(option)
        this.$emit("input", this.selected.map(opt => opt.value))
        this.criteria = ""

        // Hide dropdown if we select last element in dropdown.
        if (this.dropdownOptions.length === 0) this.isOpen = false
      },

      onTagRemove(option: CripSelectOption) {
        this.selected.splice(this.selected.indexOf(option), 1)
        this.$emit("input", this.selected.map(opt => opt.value))
      },

      onInput(criteria: string) {
        this.isOpen = true
        this.current = 0
        this.criteria = criteria
        // TODO: if is async component we should call for new data for options list
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

      filter(options: CripSelectOption[], systemOptions: CripSelectOption[]): CripSelectOption[] {
        if (!this.multiple && this.criteria.length < 3) return options

        const results = options.filter(option => {
          // Ignore already selected options for tagging.
          if (this.multiple && this.selected.filter(v => v.key === option.key).length > 0)
            return false

          return option.text.indexOf(this.criteria) > -1
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
    },
  })
}

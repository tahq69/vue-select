import Vue, { VNode } from "vue"
import { CripSelectOption } from "./../../types/plugin"

import { uuidv4 } from "../help"
import CripOptions from "./CripOptions"

interface Data {
  isOpen: boolean
  criteria: string
  current: number
  checkpoint: null | CripSelectOption
  selected: CripSelectOption[]
}

export default function(vue: typeof Vue) {
  return vue.extend({
    name: "CripSelect",

    components: { CripOptions: CripOptions(vue) },

    template: `
      <div :class="{'open': isOpen}"
           class="crip-select dropdown">
        <div :class="{'input-group': (tags > 0 && selected.length) || clear}">
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
      tags: { type: Number, default: 0 },
      clear: { type: Boolean, default: false },
    },

    computed: {
      dropdownOptions(): CripSelectOption[] {
        if (this.options && this.options.length > 0) {
          return this.filter(this.options)
        }

        if (this.settings && this.settings.options.length > 0) {
          return this.filter(this.settings.options)
        }

        return []
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
        if (this.tags > 0 && this.current === -1) {
          this.addTag({ value: this.criteria, text: this.criteria, key: uuidv4() })
          return
        }

        // Ignore selection if there is no element highlighted in options.
        if (this.current === -1) return

        this.onSelect(this.dropdownOptions[this.current])
      },

      createCheckpoint(option: CripSelectOption): void {
        this.checkpoint = option
      },

      addTag(option: CripSelectOption) {
        this.selected.push(option)
        this.$emit("input", this.selected.map(opt => opt.value))
        this.criteria = ""
      },

      onInput(criteria: string) {
        this.isOpen = true
        this.current = -1
        this.criteria = criteria
        // TODO: if is async component we should call for new data for options list
      },

      onSelect(option: CripSelectOption): void {
        this.isOpen = false
        if (this.tags > 0) {
          this.addTag(option)
          return
        }

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
      },

      onFocus(e: Event): void {
        this.isOpen = true
      },

      onBlur(e: Event): void {
        // Close dropdown only when click binding is already propongadated.
        setTimeout(() => {
          this.isOpen = false
          if (this.checkpoint !== null) {
            this.criteria = this.checkpoint.text
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
          // Avoid form submit if dropdown is open and selection in list is on
          // some of the elements.
          e.preventDefault()
        }

        this.detectOptionForSelect()
      },

      onDown(e: Event): void {
        if (this.current < this.dropdownOptions.length - 1) {
          this.current++
        }
      },

      onUp(e: Event): void {
        if (this.current > 0) {
          this.current--
        }
      },

      filter(options: CripSelectOption[]): CripSelectOption[] {
        if (this.tags < 1 && this.criteria.length < 3) return options

        return options.filter(option => {
          // Ignore already selected options for tagging.
          if (this.tags > 0 && this.selected.filter(v => v.key === option.key).length > 0)
            return false

          return option.text.indexOf(this.criteria) > -1
        })
      },
    },
  })
}

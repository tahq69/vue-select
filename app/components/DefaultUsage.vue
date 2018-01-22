<script lang="ts">
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

import CripSelect from "@/main"
const options = [
  { key: "1", text: "one", value: { num: 1, flag: "lv" } },
  { key: "2", text: "two", value: { num: 2, flag: "gb" } },
]

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      options,
      selectedValue1: null,
      selectedValue2: null,
    }
  },
})
</script>

<template>
  <div>
    <example-section title="Default usage">
      <div class="row">
        <div class="col-12">
          <p>To start using component you need simply register it.</p>
          <div class="form-group">
            <crip-select :options="options"
                         :clear="true"
                         v-model="selectedValue1">
              When data list is empty, slot value appears in option
            </crip-select>
          </div>
          <div class="form-group">
            <label class="control-label">Selected value:</label>
            <code v-text="JSON.stringify(selectedValue1, null, 4)"></code>
          </div>
        </div>
      </div>

      <code-sample>
        import CripVueSelect from "crip-vue-select"

        Vue.use(CripVueSelect)

        Vue.extend({
          template: `
            &lt;crip-select :options="options"
                         :clear="true"
                         v-model="selectedValue" /&gt;

            &lt;code v-text="JSON.stringify(selectedValue, null, 4)"&gt;&lt;/code&gt;
          `,
          data() {
            return {
              options: [
                { key: "1", text: "one", value: { num: 1, flag: "lv" } },
                { key: "2", text: "two", value: { num: 2, flag: "gb" } },
              ],
              selectedValue: null,
            }
          }
        })
      </code-sample>
    </example-section>

    <example-section title="Multi select">
      <div class="row">
        <div class="col-12">
          <p>
            Set
            <code>multiple</code> property to
            <code>true</code> to allow select multiple values from options. This will create an array
            object in resulting model.
          </p>
          <div class="form-group">
            <crip-select :options="options"
                         :multiple="true"
                         :clear="true"
                         v-model="selectedValue2">
              When data list is empty, slot value appears in option
            </crip-select>
          </div>
          <div class="form-group">
            <label class="control-label">Selected value:</label>
            <code v-text="JSON.stringify(selectedValue2, null, 4)"></code>
          </div>
        </div>
      </div>

      <code-sample>
        import CripVueSelect from "crip-vue-select"

        Vue.use(CripVueSelect)

        Vue.extend({
          template: `
            &lt;crip-select :options="options"
                         :clear="true"
                         v-model="selectedValue" /&gt;

            &lt;code v-text="JSON.stringify(selectedValue, null, 4)"&gt;&lt;/code&gt;
          `,
          data() {
            return {
              options: [
                { key: "1", text: "one", value: { num: 1, flag: "lv" } },
                { key: "2", text: "two", value: { num: 2, flag: "gb" } },
              ],
              selectedValue: null,
            }
          }
        })
      </code-sample>
    </example-section>
  </div>
</template>

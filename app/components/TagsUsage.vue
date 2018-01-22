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
  name: "TagsUsage",

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
    <example-section title="Select tags">
      <div class="row">
        <div class="col-12">
          <p>Tags property allows to select un-existing value.</p>
          <div class="form-group">
            <crip-select :options="options"
                         :clear="true"
                         :tags="true"
                         v-model="selectedValue1" />
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
                         :tags="true"
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

    <example-section title="Multiple select tags">
      <div class="row">
        <div class="col-12">
          <p>
            Tags property together with multiple - allows to select many values including non
            existing ones and resulting object always will be an array of selected
            options.
          </p>
          <div class="form-group">
            <crip-select :options="options"
                         :tags="true"
                         :multiple="true"
                         v-model="selectedValue2" />
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
                         :multiple="true"
                         :clear="true"
                         :tags="true"
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

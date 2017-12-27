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
      selectedValue: null,
    }
  },
})
</script>

<template>
  <example-section title="Tags usage">
    <div class="row">
      <div class="col-xs-12">
        <p>Tags property allows to select un-existing values.</p>
        <div class="form-group">
          <crip-select :options="options"
                       :clear="true"
                       :tags="1"
                       v-model="selectedValue" />
        </div>
        <div class="form-group">
          <label class="control-label">Selected value:</label>
          <code v-text="JSON.stringify(selectedValue, null, 4)"></code>
        </div>
      </div>
    </div>

    <code-sample>
      import CripVueSelect from "crip-vue-select"

      Vue.use(CripVueSelect)

      Vue.extend({
        template: `
          &lt;crip-select :options="options"
                       :text="textRender"
                       :clear="true"
                       :tags="1"
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
</template>

<script lang="ts">
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

import CripSelect from "@/main"

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      settings: new CripSelect([
        { key: "1", text: "one", value: { num: 1, flag: "lv" } },
        { key: "2", text: "two", value: { num: 2, flag: "gb" } },
      ]),
      selectedValue: null,
    }
  },
})
</script>

<template>
  <example-section title="Default usage">
    <div class="row">
      <div class="col-xs-12">
        <p>To start using component you need simply register it.</p>
        <div>
          <crip-select :settings="settings"
                       v-model="selectedValue" />
        </div>
        <code v-text="JSON.stringify(selectedValue, null, 4)"></code>
      </div>
    </div>

    <code-sample>
      import CripVueSelect from "crip-vue-select"

      Vue.use(CripVueSelect)

      Vue.extend({
        template: `
          &lt;crip-select :settings="options"
                       :text="textRender"
                       v-model="selectedValue" /&gt;
        `,
        data() {
          return {

          }
        }
      })
    </code-sample>
  </example-section>
</template>

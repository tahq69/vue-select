<script lang="ts">
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      options: [
        { text: "one", value: { num: 1, flag: "lv" } },
        { text: "two", value: { num: 2, flag: "gb" } },
      ],
      selectedValue: null,
    }
  },

  methods: {
    textRender(o: { text: string; value: { num: number; flag: string } }) {
      return `${o.value.num} <i>${o.value.flag}</i> ${o.text}`
    },
  },
})
</script>

<template>
  <example-section title="Default usage">
    <div class="row">
      <div class="col-xs-12">
        <p>To start using component you need simply register it.</p>
        <div>
          <crip-select
            :options="options"
            :text="textRender"
            v-model="selectedValue"
          />
        </div>
      </div>
    </div>

    <code-sample>
      import CripVueSelect from "crip-vue-select"

      Vue.use(CripVueSelect)

      Vue.extend({
        template: `
          &lt;crip-select
            :options="options"
            :text="textRender"
            v-model="selectedValue"
          /&gt;
        `,
        data() {
          return {

          }
        }
      })
    </code-sample>
  </example-section>
</template>

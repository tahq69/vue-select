<script lang="ts">
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "Configurations",

  components: { ExampleSection, CodeSample },

  methods: {},
})
</script>

<template>
  <example-section title="Configurations">
    <div class="row">
      <div class="col-12">
        <p>Available configurations on plugin registration.</p>
      </div>
    </div>

    <code-sample>
      import CripVueSelect, { CripSelectOptions } from "crip-vue-select"

      Vue.use&lt;CripSelectOptions&gt;(CripVueSelect, {
        // Prefix of the registered vue component.
        componentPrefix: "Crip",

        // Level of the logged message to console: "debug" | "log" | "warn" | "error"
        logLevel: "error",

        // Allows to disable any message logged to browser console.
        verbose: true,
      })
    </code-sample>
  </example-section>
</template>

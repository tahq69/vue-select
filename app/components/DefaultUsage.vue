<script lang="ts">
import Vue from "vue"

import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

export default Vue.extend({
  name: "DefaultUsage",

  components: { ExampleSection, CodeSample },

  methods: {},
})
</script>

<template>
  <example-section title="Default usage">
    <div class="row">
      <div class="col-xs-12">
        <p>To start using component you need simply register it.</p>
      </div>
    </div>

    <code-sample>
      import CripVueSelect from "crip-vue-select"

      Vue.use(CripVueSelect)

      Vue.extend({
        methods: {},
        },
      })
    </code-sample>
  </example-section>
</template>

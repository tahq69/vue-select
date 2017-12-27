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
      <div class="col-xs-12">
        <p>Some configurations.</p>

        <button class="btn btn-default"
                @click="alert">
          Alert
        </button>
      </div>
    </div>

    <code-sample>
      import CripVueSelect from "crip-vue-select"

      Vue.use(CripVueSelect)

      Vue.extend({
        methods: {
          ...
        },
      })
    </code-sample>
  </example-section>
</template>

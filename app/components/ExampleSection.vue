<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Section",

  props: {
    title: { type: String, required: true },
  },
})
</script>

<template>
  <div class="card mb-3">
    <div class="card-header text-white bg-primary">{{ title }}</div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

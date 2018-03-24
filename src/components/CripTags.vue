<script lang="ts">
import Vue from "vue"
import { SelectOption } from "../../types/plugin"

export default Vue.extend({
  name: "CripTags",

  props: {
    tags: { type: Array, required: true },
  },

  computed: {
    show(): boolean {
      return this.tags.length > 0
    },
  },

  methods: {
    remove(option: SelectOption) {
      this.$emit("remove", option)
    },
  },
})
</script>

<template>
  <div class="input-group-btn input-group-prepend crip-tags"
       v-if="show">
    <button v-for="tag in tags"
            :key="tag.key"
            @click="remove(tag)"
            title="Remove"
            class="btn btn-default btn-outline-secondary"
            type="button">{{ tag.text }}</button>
  </div>
</template>


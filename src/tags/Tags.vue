<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop, Watch } from "vue-property-decorator"

import CripOption from "./../Option"

@Component({ name: "CripTags" })
export default class CripTags<T> extends Vue {
  public tags: Array<CripOption<T>> = []
}
</script>

<template>
  <div class="input-group-btn">
    <button
        v-for="tag in tags"
        :key="tag.key"
        class="btn btn-default"
    >
      {{ tag.plainText() }}
    </button>
  </div>
</template>


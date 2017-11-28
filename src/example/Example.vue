<script lang="ts">
// tslint:disable:no-console
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"

@Component({ name: "Example" })
export default class Example extends Vue {
  public options = [{ text: "one", value: 1 }, { text: "two", value: 2 }]

  public selectedValue = null

  public mounted() {
    console.log("Example mounted")
  }
}
</script>

<template>
  <div class="row">
    <form
        class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"
        @submit.prevent="submit"
    >
      <div class="form-group">
        <crip-select :options="options" v-model="selectedValue" />
      </div>

      <div>{{ selectedValue }}</div>
    </form>
  </div>
</template>


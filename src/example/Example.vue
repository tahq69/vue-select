<script lang="ts">
// tslint:disable:no-console
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"

@Component({ name: "Example" })
export default class Example extends Vue {
  public options = [
    { text: "one", value: 1 },
    { text: "two", value: 2 },
    { text: "three", value: 3 },
    { text: "four", value: 4 },
    { text: "five", value: 5 },
    { text: "six", value: 6 },
    { text: "seven", value: 7 },
    { text: "eight", value: 8 },
    { text: "nine", value: 9 },
    { text: "ten", value: 10 },
    { text: "eleven", value: 11 },
    { text: "twelve", value: 12 },
    { text: "thirteen", value: 13 },
    { text: "fourteen", value: 14 },
    { text: "fifteen", value: 15 },
    { text: "sixteen", value: 16 },
  ]

  public selectedValue = null
  public selectedValue2 = null

  public mounted() {
    console.log("Example mounted")
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <form
          class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"
          @submit.prevent="submit"
      >
        <div class="form-group">
          <CripSelect :options="options" v-model="selectedValue" />
        </div>

        <!--<div class="form-group">
          <CripSelect :options="options" v-model="selectedValue2" />
        </div>-->

        <div>1) {{ selectedValue }}</div>

        <!--<div>2) {{ selectedValue2 }}</div>-->

      </form>
    </div>
  </div>
</template>


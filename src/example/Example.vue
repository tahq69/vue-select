<template>
  <div class="container">
    <div class="row">
      <form
          class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"
          @submit.prevent="submit"
      >
        <div class="form-group">
          <CripSelect
              :options="options"
              :text="textRender"
              v-model="selectedValue"
          />
        </div>

        <div class="form-group">
          <CripSelect
              :options="options"
              :text="textRender"
              v-model="selectedValue2"
              :allow-clear="true"
          />
        </div>

        <div>1) {{ selectedValue }}</div>

        <div>2) {{ selectedValue2 }}</div>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
// tslint:disable:no-console
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"

@Component({ name: "Example" })
export default class Example extends Vue {
  public options = [
    { text: "one two", value: { num: 12, flag: "lv" } },
    { text: "one two three", value: { num: 123, flag: "lv" } },
    { text: "one", value: { num: 1, flag: "lv" } },
    { text: "two", value: { num: 2, flag: "lv" } },
    { text: "three", value: { num: 3, flag: "lv" } },
    { text: "four", value: { num: 4, flag: "lv" } },
    { text: "five", value: { num: 5, flag: "lv" } },
    { text: "six", value: { num: 6, flag: "lv" } },
    { text: "seven", value: { num: 7, flag: "lv" } },
    { text: "eight", value: { num: 8, flag: "lv" } },
    { text: "nine", value: { num: 9, flag: "lv" } },
    { text: "ten", value: { num: 10, flag: "lv" } },
    { text: "eleven", value: { num: 11, flag: "lv" } },
    { text: "twelve", value: { num: 12, flag: "lv" } },
    { text: "thirteen", value: { num: 13, flag: "lv" } },
    { text: "fourteen", value: { num: 14, flag: "lv" } },
    { text: "fifteen", value: { num: 15, flag: "lv" } },
    { text: "sixteen", value: { num: 16, flag: "lv" } },
  ]

  public selectedValue = null

  public selectedValue2 = null

  public textRender(o: { text: string; value: { num: number; flag: string } }) {
    return `${o.value.num} <i>${o.value.flag}</i> ${o.text}`
  }

  public mounted() {
    console.log("Example mounted")
  }
}
</script>

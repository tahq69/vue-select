<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"

@Component({ name: "Sample" })
export default class Sample extends Vue {
  public text = "Hello"

  public hello() {
    // tslint:disable-next-line:no-console
    console.log(1)
  }

  public mounted() {
    this.hello()
    this.text += " from "
  }

  @Watch("text")
  private onTextChanged(newText, oldText) {
    // tslint:disable-next-line:no-console
    console.log({ newText, oldText })
  }
}
</script>

<template>
  <div>{{ text }}Sample.vue</div>
</template>

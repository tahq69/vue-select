<script lang="ts">
export default {
  name: "Sample",

  mounted() {
    this.hello()
  },

  methods: {
    hello: () => {
      // tslint:disable-next-line:no-console
      console.log(1)
    },
  },
}
</script>

<template>
  <div>Sample.vue</div>
</template>

# crip-vue-select

A Vue.js project to add customization around select input. Take a look to
[demo page](http://rawgit.com/tahq69/vue-select/master/index.html)

## Usage

### Install

```bash
> npm i -S crip-vue-select
```

### Setup

```javascript
import Vue from "vue'"
import CripSelect from "crip-vue-select"

// Install component in to Vue instance.
Vue.use(CripSelect)
```

### Display select in a form

```vue
<script>
export default {
  data() {
    return {
      options: [{ text: "one", value: 1 }, { text: "two", value: 2 }],
      selectedValue: "default",
    }
  }
}
</script>

<template>
  <div class="container">

    <div class="row">
      <form class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2">
        <div class="form-group">
          <crip-select :options="options" v-model="selectedValue" />
        </div>
      </form>
    </div>

  </div>
</template>
```

## Build Setup

```bash
# install dependencies and serve with hot reload at localhost:8080
> npm i && npm run dev
```

## Release steps

```cmd
./release.bat %VERSION
```

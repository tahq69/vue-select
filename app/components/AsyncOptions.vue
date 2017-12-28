<script lang="ts">
import http from "axios"
import Vue from "vue"
import { CripSelectOption, SelectOption, UpdateOptions } from "./../../types/plugin"

import CripSelect from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

function fetchData(criteria: string): Promise<CripSelectOption[]> {
  return http.get("https://jsonplaceholder.typicode.com/posts").then(response => {
    return response.data
      .reduce((acc: CripSelectOption[], post: Post) => {
        const key = post.id.toString()
        const text = post.title
        const value = post.id
        acc.push({ key, text, value })

        return acc
      }, [])
      .filter((o: CripSelectOption) => o.text.indexOf(criteria) > -1)
  })
}

export default Vue.extend({
  name: "AsyncOptions",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      settings: new CripSelect({
        async: true,
        onUpdate: (criteria: string, update: UpdateOptions) => {
          fetchData(criteria).then(data => update(data))
        },
        onInit: (select: SelectOption) => {
          fetchData("").then(data => select(data[0]))
        },
      }),
      selectedValue: null,
    }
  },
})
</script>

<template>
  <div>
    <example-section title="Async options">
      <div class="row">
        <div class="col-xs-12">
          <p>Tags property allows to select un-existing value.</p>
          <div class="form-group">
            <crip-select :settings="settings"
                         :clear="true"
                         :tags="true"
                         v-model="selectedValue" />
          </div>
          <div class="form-group">
            <label class="control-label">Selected value:</label>
            <code v-text="JSON.stringify(selectedValue, null, 4)"></code>
          </div>
        </div>
      </div>

      <code-sample>
        import CripVueSelect from "crip-vue-select"

        Vue.use(CripVueSelect)

        Vue.extend({
          template: `
            &lt;crip-select :options="options"
                         :clear="true"
                         :tags="true"
                         v-model="selectedValue" /&gt;

            &lt;code v-text="JSON.stringify(selectedValue, null, 4)"&gt;&lt;/code&gt;
          `,
          data() {
            return {
              options: [
                { key: "1", text: "one", value: { num: 1, flag: "lv" } },
                { key: "2", text: "two", value: { num: 2, flag: "gb" } },
              ],
              selectedValue: null,
            }
          }
        })
      </code-sample>
    </example-section>
  </div>
</template>

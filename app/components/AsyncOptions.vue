<script lang="ts">
// tslint:disable:no-console

import http from "axios"
import Vue from "vue"
import { SelectOption } from "./../../types/plugin"

import CripSelect from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

function fetchData(criteria: string): Promise<SelectOption[]> {
  return http.get("https://jsonplaceholder.typicode.com/posts").then(response => {
    return response.data
      .map((post: Post) => ({ key: post.id, text: post.title, value: post.id }))
      .filter((o: SelectOption) => o.text.indexOf(criteria) > -1)
  })
}

export default Vue.extend({
  name: "AsyncOptions",

  components: { ExampleSection, CodeSample },

  data() {
    return {
      selectedValue: null,
      settings: new CripSelect({
        onCriteriaChange: (criteria, update) => {
          fetchData(criteria).then(data => update(data))
        },
      }),
    }
  },
})
</script>

<template>
  <div>
    <example-section title="Async options">
      <div class="row">
        <div class="col-12">
          <p>
            It is possible to fetch data asynchrounusly from server, when
            criteria value changes. It requires to pass settings attribute to
            the component and provie callback method for data load.
          </p>
          <div class="form-group">
            <crip-select :settings="settings"
                         v-model="selectedValue"
                         clear>
              Please enter valid criteria to fine existing values. 
            </crip-select>
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
            &lt;crip-select :settings="settings"
                         v-model="selectedValue"
                         clear
                         tags /&gt;

            &lt;code v-text="JSON.stringify(selectedValue, null, 4)"&gt;&lt;/code&gt;
          `,
          data() {
            return {
              settings: new CripSelect({
                onCriteriaChange: (criteria, setOptionsList, id) => {
                  fetchData(criteria).then(data => {
                    var options = data.map(d => ({
                      key: d.Id,
                      text: d.Title,
                      value: d.Id
                    }))

                    // id makes sure that outdated data is not preset for user.
                    setOptionsList(options, id)
                  })
                },
              }),
              selectedValue: null,
            }
          }
        })
      </code-sample>
    </example-section>
  </div>
</template>

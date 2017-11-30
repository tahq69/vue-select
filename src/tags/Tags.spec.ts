import Vue from "vue"
import Tags from "./Tags.vue"

function getVm(propsData) {
  const ctor = Vue.extend(Tags)
  return new ctor({ propsData }).$mount()
}

describe("Tags.vue", () => {
  it("should render without exception", () => {
    const vm = getVm({})
    expect(true).toBe(true)
  })
})

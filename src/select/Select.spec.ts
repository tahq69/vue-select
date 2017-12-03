import Vue from "vue"
import Select from "./Select.vue"

function getVm(propsData: PropsData) {
  const ctor = Vue.extend(Select)
  return new ctor({ propsData }).$mount()
}

describe("Select.vue", () => {
  it("should render without exception", () => {
    const vm = getVm({})
    expect(true).toBe(true)
  })

  it("should render with close btn", () => {
    const vm = getVm({ allowClear: true })
    expect(vm.$el.getElementsByClassName("c-close-btn")).not.toBeNull()
  })
})

interface PropsData {
  options?: any[]
  text?: (o) => string
  count?: number
  allowClear?: boolean
  tags?: boolean
}

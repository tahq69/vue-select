import expect from "expect"
import Vue from "vue"
import { mount, VueClass, Wrapper } from "vue-test-utils"

import CripOptions from "@/components/CripOptions.vue"

const option1 = { key: "1", text: "one", value: 1 }
const option2 = { key: "2", text: "two", value: 2 }
const propsData = { options: [option1, option2], criteria: "", current: -1 }

describe("CripOptions", () => {
  const wrapper = mount(CripOptions, { propsData })

  it("Validates properties", () => {
    const props: any = wrapper.vm.$options.props
    const options = props["options"]
    const criteria = props["criteria"]
    const current = props["current"]

    expect(options.required).toBeTruthy()
    expect(criteria.required).toBeTruthy()
    expect(current.required).toBeTruthy()
    expect(options.type).toBe(Array)
    expect(criteria.type).toBe(String)
    expect(current.type).toBe(Number)
  })

  it("Should have empty current value if current index is -1", () => {
    const data: any = wrapper.vm
    expect(data.currentValue).toEqual(undefined)
  })

  it("Should set current value if index is changed", () => {
    wrapper.setProps({ current: 0 })

    const data: any = wrapper.vm
    expect(data.currentValue).toEqual({ key: "1", text: "one", value: 1 })
  })
})

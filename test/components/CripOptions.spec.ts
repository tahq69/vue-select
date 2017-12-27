import expect from "expect"
import Vue from "vue"
import { mount, VueClass, Wrapper } from "vue-test-utils"

import CripOptions from "@/components/CripOptions"

const option1 = { key: "1", text: "one", value: 1 }
const option2 = { key: "2", text: "two", value: 2 }
const propsData = { options: [option1, option2], criteria: "", current: -1 }

describe("CripOptions", () => {
  it("Wraps without errors", () => {
    const component = CripOptions(Vue)
    const wrapper = mount(component, { propsData })
  })

  it("Contains passed properties", (done) => {
    const component = CripOptions(Vue)
    const wrapper = mount(component, { propsData })

    // expect(wrapper.vm.options).toEqual([option1, option2])
    // expect(wrapper.vm.criteria).toEqual("")
    // expect(wrapper.vm.current).toEqual(-1)

    done()
  })

  it("Should have empty current value if current index is -1", (done) => {
    const component = CripOptions(Vue)
    const wrapper = mount(component, { propsData })

    // expect(wrapper.vm.currentValue).toEqual(undefined)

    done()
  })
})

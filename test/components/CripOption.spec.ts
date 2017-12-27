import expect from "expect"
import Vue from "vue"
import { shallow } from "vue-test-utils"

import CripOption from "../../src/components/CripOption"

describe("CripOption", () => {
  it("Wraps without errors", () => {
    const option = { key: "1", text: "one", value: 1 }
    const wrapper = shallow(CripOption(Vue), {
      propsData: { option, criteria: "" },
    })
  })

  it("Emits select event when option is clicked", () => {
    const option = { key: "1", text: "one", value: 1 }
    const wrapper = shallow(CripOption(Vue), {
      propsData: { option, criteria: "" },
    })

    wrapper.find(".crip-option").trigger("click")

    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select.length).toBe(1)
    expect(wrapper.emitted().select[0][0]).toEqual(option)
  })
})

import expect from "expect"
import Vue from "vue"
import { mount } from "vue-test-utils"

import CripOption from "@/components/CripOption.vue"

const option = { key: "1", text: "one", value: 1 }

describe("CripOption", () => {
  const wrapper = mount(CripOption, {
    propsData: { option, criteria: "" },
  })

  it("Emits select event when option is clicked", () => {
    wrapper.find(".crip-option").trigger("click")

    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select.length).toBe(1)
    expect(wrapper.emitted().select[0][0]).toEqual(option)
  })

  it("Shows highlighted text when criteria matches text value", () => {
    wrapper.setProps({ criteria: "on" })

    expect(wrapper.text()).toBe("one")
    expect(wrapper.find(".crip-option").html()).toBe(
      `<a href="#" class="crip-option"><strong>on</strong>e</a>`
    )
  })
})

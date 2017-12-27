import expect from "expect"
import Vue from "vue"
import { mount } from "vue-test-utils"

import CripOption from "@/components/CripOption"

const option = { key: "1", text: "one", value: 1 }

describe("CripOption", () => {
  it("Mounts without errors", (done) => {
    const wrapper = mount(CripOption(Vue), {
      propsData: { option, criteria: "" },
    })

    done()
  })

  it("Emits select event when option is clicked", (done) => {
    const wrapper = mount(CripOption(Vue), {
      propsData: { option, criteria: "" },
    })

    console.log(wrapper.text() + "HTML")
    wrapper.find(".crip-option").trigger("click")

    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select.length).toBe(1)
    expect(wrapper.emitted().select[0][0]).toEqual(option)

    done()
  })

  it("Shows highlighted text when criteria matches text value", (done) => {
    const wrapper = mount(CripOption(Vue), {
      propsData: { option, criteria: "on" },
    })

    expect(wrapper.text()).toBe("one")
    expect(wrapper.find(".crip-option").html()).toBe(
      `<a href="#" class="crip-option"><strong>on</strong>e</a>`
    )

    done()
  })
})

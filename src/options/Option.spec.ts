import Vue from "vue"
import Option from "./Option.vue"

function getVm(propsData: PropsData) {
  const ctor = Vue.extend(Option)
  return new ctor({ propsData }).$mount()
}

describe("Option.vue", () => {
  it("should render without exception", () => {
    const vm = getVm({
      option: { highlightedText: c => `${c}_text` },
      criteria: "criteria",
    })

    expect(vm.$el.innerHTML).toBe("<a href=\"#\">criteria_text</a>")
  })

  it("should change link text when criteria changes", done => {
    const vm: any = getVm({
      option: { highlightedText: c => `${c}_text` },
      criteria: "criteria",
    })

    vm.criteria = "new-value"

    Vue.nextTick(() => {
      expect(vm.$el.textContent).toBe("new-value_text")
      done()
    })
  })
})

interface PropsData {
  criteria: string
  option: { highlightedText: (o) => string }
}

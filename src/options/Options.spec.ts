// tslint:disable:quotemark
import Vue from "vue"
import Options from "./Options.vue"

function getVm(propsData: PropsData) {
  const ctor = Vue.extend(Options)
  return new ctor({ propsData }).$mount()
}

function isActive(requiredKey) {
  return key => {
    return requiredKey === key
  }
}

describe("Options.vue", () => {
  it("should render without exception", () => {
    const vm = getVm({
      options: [
        {
          highlightedText: c => `${c}_text`,
          key: "1",
          isActive: isActive("1"),
        },
      ],
      criteria: "criteria",
      current: -1,
    })

    expect(vm.$el.innerHTML).toBe(
      '<li class=""><a href="#">criteria_text</a></li> <!---->',
    )
  })

  /*it("should add active class when current is index of an array", done => {
    const vm: any = getVm({
      options: [
        {
          highlightedText: c => `${c}_text`,
          key: "1",
          isActive: isActive("1"),
        },
      ],
      criteria: "criteria",
      current: 0,
    })

    vm.criteria = "new-value"

    Vue.nextTick(() => {
      expect(vm.$el.textContent).toBe("new-value_text")
      done()
    })
  })*/
})

interface Option {
  key: string
  highlightedText: (o) => string
  isActive: (key: string) => boolean
}

interface PropsData {
  current: number
  criteria: string
  options: Option[]
}

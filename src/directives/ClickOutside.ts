import { DirectiveOptions } from "vue"

const directive: DirectiveOptions = {
  // Called when the bound element has been inserted into its parent node (this
  // only guarantees parent node presence, not necessarily in-document).
  inserted: (element, binding, vnode) => {
    const el = element as any
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== "function") {
      const context = vnode.context
      const compName = context && context.$options.name ? context.$options.name : "unknown"
      const expression = binding.expression
      let warn =
        `[Vue-click-outside:] provided expression '${expression}' is` +
        ` not a function, but has to be`
      if (compName) {
        warn += `Found in component '${compName}'`
      }

      // tslint:disable-next-line:no-console
      console.warn(warn)
    }

    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e: Event) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }

    el.__cripSelectClickOutside__ = handler

    // add Event Listeners
    document.addEventListener("click", handler)
  },

  unbind: element => {
    const el = element as any
    // Remove Event Listeners
    document.removeEventListener("click", el.__cripSelectClickOutside__)
    el.__cripSelectClickOutside__ = null
  },
}

export default directive

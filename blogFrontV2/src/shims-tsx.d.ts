import { defineComponent, VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ReturnType<typeof defineComponent> {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

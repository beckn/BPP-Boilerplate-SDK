import { atom } from 'recoil'

export const selectedModelAtom = atom({
  key: 'selectedModel',
  default: {
    name: '',
    selected_element: {}
  }
})

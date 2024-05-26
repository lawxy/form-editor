import type { IBaseElement } from "@/types"

export const ELEMENT_INPUT = 'input'
export const INPUT_TEXT = '文本框'
export const initialData: Partial<IBaseElement> = {
  elementName: '文本框',
  textType: 'single',
  gridSpan: 24,
  autoSize: true
}
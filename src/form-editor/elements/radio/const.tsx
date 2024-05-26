import type { IBaseElement } from "@/types"
import { idCreator } from "@/utils"

export const ELEMENT_RADIO = 'radio'
export const RADIO_TEXT = '单选'
export const initialData: Partial<IBaseElement> = {
  elementName: '单选',
  gridSpan: 24,
  alignDirection: 'horizontal',
}
import type { IBaseElement } from "@/types"

export const ELEMENT_TIME = 'time'
export const TIME_TEXT = '时间'
export const initialData: Partial<IBaseElement> = {
  elementName: '时间',
  dateFormat: 'HH:mm:ss',
  gridSpan: 24
}
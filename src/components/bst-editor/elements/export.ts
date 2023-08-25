
/**
  * 此文件可自动生成, 生成脚本在根目录/scripts/auto-export.js
  * 生成规则是文件中的变量名都跟文件夹本身的name强相关
  * eg:
  *   input目录下的文件 ELEMENT_INPUT、RenderInput、INPUT_TEXT、SettingInput
  * 前缀和后缀都是固定的, 大小写也是固定的 -> 组件名采用驼峰命名法, 常量使用全部大写
  * 
*/

import type { IDragElementProp } from '../types'
  
import { ELEMENT_CHECKBOX, RenderCheckbox, SettingCheckbox, CHECKBOX_TEXT, initialData as Checkbox_initData } from './checkbox'
export { ELEMENT_CHECKBOX, RenderCheckbox, SettingCheckbox, CHECKBOX_TEXT } from './checkbox'
        
import { ELEMENT_DATE, RenderDate, SettingDate, DATE_TEXT, initialData as Date_initData } from './date'
export { ELEMENT_DATE, RenderDate, SettingDate, DATE_TEXT } from './date'
        
import { ELEMENT_INPUT, RenderInput, SettingInput, INPUT_TEXT, initialData as Input_initData } from './input'
export { ELEMENT_INPUT, RenderInput, SettingInput, INPUT_TEXT } from './input'
        
import { ELEMENT_NUMBER, RenderNumber, SettingNumber, NUMBER_TEXT, initialData as Number_initData } from './number'
export { ELEMENT_NUMBER, RenderNumber, SettingNumber, NUMBER_TEXT } from './number'
        
import { ELEMENT_RADIO, RenderRadio, SettingRadio, RADIO_TEXT, initialData as Radio_initData } from './radio'
export { ELEMENT_RADIO, RenderRadio, SettingRadio, RADIO_TEXT } from './radio'
        
import { ELEMENT_SELECT, RenderSelect, SettingSelect, SELECT_TEXT, initialData as Select_initData } from './select'
export { ELEMENT_SELECT, RenderSelect, SettingSelect, SELECT_TEXT } from './select'
        
import { ELEMENT_TIME, RenderTime, SettingTime, TIME_TEXT, initialData as Time_initData } from './time'
export { ELEMENT_TIME, RenderTime, SettingTime, TIME_TEXT } from './time'
        
export const ElementsList: Record<string, IDragElementProp> = {
      
  [ELEMENT_INPUT]: {
    type: ELEMENT_INPUT,
    render: RenderInput,
    setting: SettingInput,
    text: INPUT_TEXT,
    initialData: Input_initData
  },

  [ELEMENT_NUMBER]: {
    type: ELEMENT_NUMBER,
    render: RenderNumber,
    setting: SettingNumber,
    text: NUMBER_TEXT,
    initialData: Number_initData
  },

  [ELEMENT_DATE]: {
    type: ELEMENT_DATE,
    render: RenderDate,
    setting: SettingDate,
    text: DATE_TEXT,
    initialData: Date_initData
  },

  [ELEMENT_TIME]: {
    type: ELEMENT_TIME,
    render: RenderTime,
    setting: SettingTime,
    text: TIME_TEXT,
    initialData: Time_initData
  },

  [ELEMENT_SELECT]: {
    type: ELEMENT_SELECT,
    render: RenderSelect,
    setting: SettingSelect,
    text: SELECT_TEXT,
    initialData: Select_initData
  },

  [ELEMENT_RADIO]: {
    type: ELEMENT_RADIO,
    render: RenderRadio,
    setting: SettingRadio,
    text: RADIO_TEXT,
    initialData: Radio_initData
  },

  [ELEMENT_CHECKBOX]: {
    type: ELEMENT_CHECKBOX,
    render: RenderCheckbox,
    setting: SettingCheckbox,
    text: CHECKBOX_TEXT,
    initialData: Checkbox_initData
  },
}
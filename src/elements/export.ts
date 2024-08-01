
/**
  * 此文件可自动生成, 生成脚本在根目录/scripts/auto-export.js
  * 生成规则是文件中的变量名都跟文件夹本身的name强相关
  * eg:
  *   input目录下的文件 ELEMENT_INPUT、RenderInput、INPUT_TEXT、SettingInput
  * 前缀和后缀都是固定的, 大小写也是固定的 -> 组件名采用驼峰命名法, 常量使用全部大写
  * 
*/

import type { IDragElementProp } from '../types'
  
import { ELEMENT_BUTTON, RenderButton, SettingButton, BUTTON_TEXT, initialData as Button_initData, eventActions as Button_eventActions, Icon as BUTTON_Icon } from './button'
export { ELEMENT_BUTTON, RenderButton, SettingButton, BUTTON_TEXT } from './button'
        
import { ELEMENT_CHECKBOX, RenderCheckbox, SettingCheckbox, CHECKBOX_TEXT, initialData as Checkbox_initData, eventActions as Checkbox_eventActions, Icon as CHECKBOX_Icon } from './checkbox'
export { ELEMENT_CHECKBOX, RenderCheckbox, SettingCheckbox, CHECKBOX_TEXT } from './checkbox'
        
import { ELEMENT_CONTAINER, RenderContainer, SettingContainer, CONTAINER_TEXT, initialData as Container_initData, eventActions as Container_eventActions, Icon as CONTAINER_Icon } from './container'
export { ELEMENT_CONTAINER, RenderContainer, SettingContainer, CONTAINER_TEXT } from './container'
        
import { ELEMENT_DATE, RenderDate, SettingDate, DATE_TEXT, initialData as Date_initData, eventActions as Date_eventActions, Icon as DATE_Icon } from './date'
export { ELEMENT_DATE, RenderDate, SettingDate, DATE_TEXT } from './date'
        
import { ELEMENT_IMAGE, RenderImage, SettingImage, IMAGE_TEXT, initialData as Image_initData, eventActions as Image_eventActions, Icon as IMAGE_Icon } from './image'
export { ELEMENT_IMAGE, RenderImage, SettingImage, IMAGE_TEXT } from './image'
        
import { ELEMENT_INPUT, RenderInput, SettingInput, INPUT_TEXT, initialData as Input_initData, eventActions as Input_eventActions, Icon as INPUT_Icon } from './input'
export { ELEMENT_INPUT, RenderInput, SettingInput, INPUT_TEXT } from './input'
        
import { ELEMENT_NUMBER, RenderNumber, SettingNumber, NUMBER_TEXT, initialData as Number_initData, eventActions as Number_eventActions, Icon as NUMBER_Icon } from './number'
export { ELEMENT_NUMBER, RenderNumber, SettingNumber, NUMBER_TEXT } from './number'
        
import { ELEMENT_RADIO, RenderRadio, SettingRadio, RADIO_TEXT, initialData as Radio_initData, eventActions as Radio_eventActions, Icon as RADIO_Icon } from './radio'
export { ELEMENT_RADIO, RenderRadio, SettingRadio, RADIO_TEXT } from './radio'
        
import { ELEMENT_SELECT, RenderSelect, SettingSelect, SELECT_TEXT, initialData as Select_initData, eventActions as Select_eventActions, Icon as SELECT_Icon } from './select'
export { ELEMENT_SELECT, RenderSelect, SettingSelect, SELECT_TEXT } from './select'
        
import { ELEMENT_SWITCH, RenderSwitch, SettingSwitch, SWITCH_TEXT, initialData as Switch_initData, eventActions as Switch_eventActions, Icon as SWITCH_Icon } from './switch'
export { ELEMENT_SWITCH, RenderSwitch, SettingSwitch, SWITCH_TEXT } from './switch'
        
import { ELEMENT_TABLE, RenderTable, SettingTable, TABLE_TEXT, initialData as Table_initData, eventActions as Table_eventActions, Icon as TABLE_Icon } from './table'
export { ELEMENT_TABLE, RenderTable, SettingTable, TABLE_TEXT } from './table'
        
import { ELEMENT_TABS, RenderTabs, SettingTabs, TABS_TEXT, initialData as Tabs_initData, eventActions as Tabs_eventActions, Icon as TABS_Icon } from './tabs'
export { ELEMENT_TABS, RenderTabs, SettingTabs, TABS_TEXT } from './tabs'
        
import { ELEMENT_TEXT, RenderText, SettingText, TEXT_TEXT, initialData as Text_initData, eventActions as Text_eventActions, Icon as TEXT_Icon } from './text'
export { ELEMENT_TEXT, RenderText, SettingText, TEXT_TEXT } from './text'
        
import { ELEMENT_TIME, RenderTime, SettingTime, TIME_TEXT, initialData as Time_initData, eventActions as Time_eventActions, Icon as TIME_Icon } from './time'
export { ELEMENT_TIME, RenderTime, SettingTime, TIME_TEXT } from './time'
        
import { ELEMENT_UPLOAD, RenderUpload, SettingUpload, UPLOAD_TEXT, initialData as Upload_initData, eventActions as Upload_eventActions, Icon as UPLOAD_Icon } from './upload'
export { ELEMENT_UPLOAD, RenderUpload, SettingUpload, UPLOAD_TEXT } from './upload'
        
export const ElementsMap: Record<string, IDragElementProp> = {
      
  [ELEMENT_TEXT]: {
    type: ELEMENT_TEXT,
    render: RenderText,
    setting: SettingText,
    text: TEXT_TEXT,
    eventActions: Text_eventActions,
    initialData: Text_initData,
    Icon: TEXT_Icon
  },

  [ELEMENT_INPUT]: {
    type: ELEMENT_INPUT,
    render: RenderInput,
    setting: SettingInput,
    text: INPUT_TEXT,
    eventActions: Input_eventActions,
    initialData: Input_initData,
    Icon: INPUT_Icon
  },

  [ELEMENT_NUMBER]: {
    type: ELEMENT_NUMBER,
    render: RenderNumber,
    setting: SettingNumber,
    text: NUMBER_TEXT,
    eventActions: Number_eventActions,
    initialData: Number_initData,
    Icon: NUMBER_Icon
  },

  [ELEMENT_DATE]: {
    type: ELEMENT_DATE,
    render: RenderDate,
    setting: SettingDate,
    text: DATE_TEXT,
    eventActions: Date_eventActions,
    initialData: Date_initData,
    Icon: DATE_Icon
  },

  [ELEMENT_TIME]: {
    type: ELEMENT_TIME,
    render: RenderTime,
    setting: SettingTime,
    text: TIME_TEXT,
    eventActions: Time_eventActions,
    initialData: Time_initData,
    Icon: TIME_Icon
  },

  [ELEMENT_SELECT]: {
    type: ELEMENT_SELECT,
    render: RenderSelect,
    setting: SettingSelect,
    text: SELECT_TEXT,
    eventActions: Select_eventActions,
    initialData: Select_initData,
    Icon: SELECT_Icon
  },

  [ELEMENT_RADIO]: {
    type: ELEMENT_RADIO,
    render: RenderRadio,
    setting: SettingRadio,
    text: RADIO_TEXT,
    eventActions: Radio_eventActions,
    initialData: Radio_initData,
    Icon: RADIO_Icon
  },

  [ELEMENT_CHECKBOX]: {
    type: ELEMENT_CHECKBOX,
    render: RenderCheckbox,
    setting: SettingCheckbox,
    text: CHECKBOX_TEXT,
    eventActions: Checkbox_eventActions,
    initialData: Checkbox_initData,
    Icon: CHECKBOX_Icon
  },

  [ELEMENT_SWITCH]: {
    type: ELEMENT_SWITCH,
    render: RenderSwitch,
    setting: SettingSwitch,
    text: SWITCH_TEXT,
    eventActions: Switch_eventActions,
    initialData: Switch_initData,
    Icon: SWITCH_Icon
  },

  [ELEMENT_BUTTON]: {
    type: ELEMENT_BUTTON,
    render: RenderButton,
    setting: SettingButton,
    text: BUTTON_TEXT,
    eventActions: Button_eventActions,
    initialData: Button_initData,
    Icon: BUTTON_Icon
  },

  [ELEMENT_IMAGE]: {
    type: ELEMENT_IMAGE,
    render: RenderImage,
    setting: SettingImage,
    text: IMAGE_TEXT,
    eventActions: Image_eventActions,
    initialData: Image_initData,
    Icon: IMAGE_Icon
  },

  [ELEMENT_UPLOAD]: {
    type: ELEMENT_UPLOAD,
    render: RenderUpload,
    setting: SettingUpload,
    text: UPLOAD_TEXT,
    eventActions: Upload_eventActions,
    initialData: Upload_initData,
    Icon: UPLOAD_Icon
  },

  [ELEMENT_TABLE]: {
    type: ELEMENT_TABLE,
    render: RenderTable,
    setting: SettingTable,
    text: TABLE_TEXT,
    eventActions: Table_eventActions,
    initialData: Table_initData,
    Icon: TABLE_Icon
  },

  [ELEMENT_CONTAINER]: {
    type: ELEMENT_CONTAINER,
    render: RenderContainer,
    setting: SettingContainer,
    text: CONTAINER_TEXT,
    eventActions: Container_eventActions,
    initialData: Container_initData,
    Icon: CONTAINER_Icon
  },

  [ELEMENT_TABS]: {
    type: ELEMENT_TABS,
    render: RenderTabs,
    setting: SettingTabs,
    text: TABS_TEXT,
    eventActions: Tabs_eventActions,
    initialData: Tabs_initData,
    Icon: TABS_Icon
  },
}
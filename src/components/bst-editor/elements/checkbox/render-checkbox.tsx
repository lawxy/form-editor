import React from 'react'
import { Checkbox } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '../../types';
import { ELEMENT_CHECKBOX } from './const';
import store from '../../store';

const RenderCheckboxContent: React.FC<{
  fieldValue: any;
  props: IBaseElement;
}> = ({fieldValue, props = {}}) => {
  const { id, elementName, dateFormat } = props
  return (
    <div>
      <div>{elementName}</div>
      <Checkbox />
    </div>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderCheckbox = observer(RenderCheckboxContent)
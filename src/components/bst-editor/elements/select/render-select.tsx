import React from 'react'
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '../../types';
import { ELEMENT_SELECT } from './const';
import store from '../../store';

const RenderSelectContent: React.FC<{
  fieldValue: any;
  props: IBaseElement;
}> = ({fieldValue, props = {}}) => {
  const { id, elementName, dateFormat } = props;
  return (
    <div>
      <div>{elementName}</div>
      <Select style={{width: '100%'}}/>
    </div>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderSelect = observer(RenderSelectContent)
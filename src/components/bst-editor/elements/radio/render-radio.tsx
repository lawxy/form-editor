import React from 'react'
import { Radio } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '../../types';
import { ELEMENT_RADIO } from './const';
import store from '../../store';

const RenderRadioContent: React.FC<{
  fieldValue: any;
  props: IBaseElement;
}> = ({fieldValue, props = {}}) => {
  const { id, elementName, dateFormat } = props;
  return (
    <div>
      <div>{elementName}</div>
      <Radio />
    </div>
  )
}

export const RenderRadio = observer(RenderRadioContent)
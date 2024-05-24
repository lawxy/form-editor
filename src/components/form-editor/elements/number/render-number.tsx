import React from 'react'
import { InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '../../types';
import store from '../../store';

const RenderNumberContent: React.FC<{
  fieldValue: any;
  props: IBaseElement;
}> = ({fieldValue, props = {}}) => {
  const { id, elementName, dateFormat } = props;
  return (
    <div>
      <div>{elementName}</div>
      <InputNumber 
        style={{width: '100%'}}
      />
    </div>
  )
}

export const RenderNumber = observer(RenderNumberContent)
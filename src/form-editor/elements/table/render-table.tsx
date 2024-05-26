import React from 'react'
import { Table } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '@/types';
import store from '@/store';
import ElementLayout from '@/components/element-layout';

const RenderTableContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({fieldValue, element = {}}) => {
  const { id, elementName, dateFormat } = element;
  return (
    <ElementLayout element={element}>
      <Table 
      />
    </ElementLayout>
  )
}

export const RenderTable = observer(RenderTableContent)
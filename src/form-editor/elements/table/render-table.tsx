import React, { useMemo } from 'react'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite';
import type { IBaseElement, TMode } from '@/types';
import store from '@/store';
import { parseJSX } from '@/utils'
import ElementLayout from '@/components/element-layout';

const RenderTableContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({fieldValue = [], element, mode}) => {
  const { tableColumns = '[]', tableAttributes = '{}' } = element;

  return (
    <ElementLayout element={element} mode={mode}>
      <Table 
        columns={parseJSX(tableColumns)}
        // dataSource={fieldValue || []}
        rowKey='id'
        dataSource={fieldValue}
        {
          ...(parseJSX(`[${tableAttributes}]`)[0])
        }
      />
    </ElementLayout>
  )
}

export const RenderTable = observer(RenderTableContent)
import React, { useMemo } from 'react'
import { Table } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '@/types';
import store from '@/store';
import ElementLayout from '@/components/element-layout';

const RenderTableContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({fieldValue, element = {}}) => {
  const { tableColumns = '[]' } = element;
  const columns = useMemo(() => {
    // 解析 JSX 语法的 JavaScript 代码
    let cols = [];
    eval(`cols = ${tableColumns}`)
    console.log('cols')
    console.log(cols)
    return cols
  }, [tableColumns])

  return (
    <ElementLayout element={element}>
      <Table 
        columns={columns}
        dataSource={fieldValue || []}
      />
    </ElementLayout>
  )
}

export const RenderTable = observer(RenderTableContent)
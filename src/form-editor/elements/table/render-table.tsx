import React, { useMemo } from 'react'
import * as Antd from 'antd';
import { Table } from 'antd'
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '@/types';
import store from '@/store';
import { parseJSX } from '@/utils'
import ElementLayout from '@/components/element-layout';
const Babel = require("@babel/standalone")


const RenderTableContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({fieldValue, element = {}}) => {
  const { tableColumns = '[]' } = element;

  const columns = useMemo(() => {

    // console.log(transformedCode)
   
    let cols = [];
    cols = parseJSX(`(${tableColumns})`);

    console.log('cols')
    console.log(cols)
    return cols
  }, [tableColumns])

  return (
    <ElementLayout element={element}>
      <Table 
        columns={columns}
        // dataSource={fieldValue || []}
        dataSource={[{}]}
      />
    </ElementLayout>
  )
}

export const RenderTable = observer(RenderTableContent)
import React from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react-lite';

import { ElementLayout } from '@/components/element-layout';
import type { IBaseElement } from '@/types';
import { parseJSX } from '@/utils';

const RenderTableContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue = [], element }) => {
  const { tableColumns = '[]', tableAttributes = '{}' } = element;

  return (
    <ElementLayout element={element}>
      <Table
        columns={parseJSX(tableColumns)}
        rowKey="id"
        dataSource={fieldValue}
        {...parseJSX(`[${tableAttributes}]`)[0]}
      />
    </ElementLayout>
  );
};

export const RenderTable = observer(RenderTableContent);

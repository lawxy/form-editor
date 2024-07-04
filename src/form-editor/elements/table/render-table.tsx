import React from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react-lite';

import { ElementLayout } from '@/components';
import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';
import { parseJSX } from '@/utils';
import { useEditorUpdate, useRegisterEvents } from '@/hooks';

const RenderTableContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue = [], element }) => {
  const { tableColumns = '[]', tableAttributes = '{}' } = element;

  const { eventFunctions } = useRegisterEvents(element);

  useEditorUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

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

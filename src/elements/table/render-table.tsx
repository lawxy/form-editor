import React from 'react';
import { Table } from 'antd';

import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';
import { parseJSX } from '@/utils';
import { useFormUpdate, useRegisterEvents } from '@/hooks';

export const RenderTable: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue = [], element, ...props }) => {
  const { tableColumns = '[]', tableAttributes = '{}', linkLoading } = element;

  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  return (
    <Table
      columns={parseJSX(tableColumns)}
      rowKey="id"
      dataSource={fieldValue}
      loading={linkLoading}
      {...parseJSX(`[${tableAttributes}]`)[0]}
      {...props}
    />
  );
};

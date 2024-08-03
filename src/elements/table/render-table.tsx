import React from 'react';
import { Table } from 'antd';

import { EEventAction } from '@/types';
import type { TElementRender } from '@/types';
import { parseJSX } from '@/utils';
import { useFormUpdate, useRegisterEvents } from '@/hooks';

export const RenderTable: TElementRender = ({ fieldValue = [], element, customStyle }) => {
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
      style={customStyle}
    />
  );
};

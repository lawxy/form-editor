import React, { useEffect, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { Popconfirm } from 'antd';

import { EEventAction } from '@/types';
import type { TElementRender } from '@/types';
import { idCreator } from '@/utils';
import { useFormUpdate, useRegisterEvents } from '@/hooks';
import { cloneDeep } from 'lodash-es';

export const RenderTable: TElementRender = ({
  fieldValue = [],
  element,
  customStyle,
  setFieldValue,
}) => {
  const { columns = [], linkLoading, readonly, lineAdd } = element;

  const [tableColumns, setColumns] = useState([]);

  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  // 使用useMemo会有bug，列展示不是预期效果
  useEffect(() => {
    const newColumns = [
      ...columns.map((column) => {
        const { name, field, fixed, width, align, valueType, options } = column;
        return {
          title: name,
          dataIndex: field,
          fixed,
          width,
          align,
          valueType,
          fieldProps: {
            options,
          },
        };
      }),
      !readonly && {
        title: '操作',
        valueType: 'option',
        width: 130,
        render: (text: any, record: any, idx: number, action: any) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <Popconfirm
            key="delete"
            title="确认删除"
            onConfirm={() => {
              const newValue = cloneDeep(fieldValue);
              newValue.splice(idx, 1);
              setFieldValue(newValue);
            }}
          >
            <a>删除</a>
          </Popconfirm>,
        ],
      },
    ].filter(Boolean);
    //@ts-ignore
    setColumns(newColumns);
  }, [columns, readonly]);

  return (
    <EditableProTable
      columns={tableColumns}
      rowKey="id"
      value={fieldValue}
      loading={linkLoading}
      style={customStyle}
      onChange={(v) => {
        setFieldValue(v);
      }}
      recordCreatorProps={{
        record: () => ({ id: idCreator('row') }),
        creatorButtonText: '新增一行',
        style: {
          display: lineAdd && !readonly ? 'block' : 'none',
        },
      }}
    />
  );
};

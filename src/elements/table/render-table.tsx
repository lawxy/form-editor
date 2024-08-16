import React, { useEffect, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { Popconfirm } from 'antd';

import { EEventAction } from '@/types';
import type { TElementRender } from '@/types';
import { idCreator } from '@/utils';
import { useFormUpdate, useRegisterEvents } from '@/hooks';
import { cloneDeep } from 'lodash-es';

const tableData = Array.from({ length: 20 }, (_, idx) => {
  return {
    id: `${idx}`,
    select: `select${idx}`,
    radio: `radio${idx}`,
    checkbox: `checkbox${idx}`,
    input: `input${idx}`,
    number: `number${idx}`,
  };
});

export const RenderTable: TElementRender = ({
  fieldValue = tableData,
  element,
  customStyle,
  setFieldValue,
}) => {
  const {
    columns = [],
    linkLoading,
    readonly,
    lineAdd,
    scrollX,
    scrollY,
    pageSize,
    pagination,
    total,
  } = element;

  const [tableColumns, setColumns] = useState([]);

  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  // 使用useMemo会有bug，列展示不是预期效果
  useEffect(() => {
    const newColumns = [
      ...columns.map((column) => {
        const {
          name,
          field,
          fixed,
          width,
          align,
          valueType,
          options,
          required,
        } = column;
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
          formItemProps: () =>
            required
              ? {
                  rules: [{ required: true, message: '此项为必填项' }],
                }
              : {},
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
      scroll={{ y: scrollY, x: scrollX }}
      recordCreatorProps={{
        record: () => ({ id: idCreator('row') }),
        creatorButtonText: '新增一行',
        style: {
          display: lineAdd && !readonly ? 'block' : 'none',
        },
      }}
      pagination={
        pagination && {
          total: total ?? fieldValue?.length,
          pageSize,
          showTotal: () => null,
          onChange(currentPage) {
            eventFunctions[EEventAction.PAGINATION_CHANGE]?.(currentPage);
          },
        }
      }
    />
  );
};

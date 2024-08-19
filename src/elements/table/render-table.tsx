import React, { useEffect, useState, useRef } from 'react';
import { EditableProTable, type ProColumns } from '@ant-design/pro-components';

import { EEventAction } from '@/types';
import type { TElementRender } from '@/types';
import { idCreator } from '@/utils';
import { useFormUpdate, useRegisterEvents } from '@/hooks';
import type { ITableEdit } from './type';

export const RenderTable: TElementRender = ({
  fieldValue = [],
  element,
  customStyle,
  setFieldValue,
  setElementProp,
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
    currentPage,
  } = element;

  const [tableColumns, setColumns] = useState<ProColumns[]>([]);

  const { eventFunctions } = useRegisterEvents(element);

  const editData = useRef<ITableEdit>({});
  
  useEffect(() => {
    Object.assign(editData.current, {
      page: currentPage!, 
      pageSize: pageSize!
    })
  }, [pageSize, currentPage])

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.(editData.current);
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.VALUE_CHANGE], fieldValue]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.PAGINATION_CHANGE]?.(
      `${currentPage},${pageSize}`,
    );
  }, [currentPage, pageSize]);

  // 使用useMemo会有bug，列展示不是预期效果
  useEffect(() => {
    const newColumns = [
      ...columns.map((column) => {
        const { options, required, ...rest } = column;
        return {
          ...rest,
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
        ],
      },
    ].filter(Boolean);
    setColumns(newColumns as ProColumns[]);
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
        eventFunctions[EEventAction.VALUE_CHANGE]?.({
          ...editData.current,
          tableData: v,
        });
      }}
      scroll={{ y: scrollY, x: scrollX }}
      editable={{
        async onSave(key, row) {
          delete editData.current?.deleteData;
          delete editData.current?.deleteId;
          Object.assign(editData.current, {
            type: 'edit',
            editId: key,
            editData: row,
          });
        },
        async onDelete(key, row) {
          delete editData.current?.editData;
          delete editData.current?.editId;
          Object.assign(editData.current, {
            type: 'delete',
            deleteId: key,
            deleteData: row,
          });
        },
      }}
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
          current: currentPage,
          showTotal: () => null,
          onChange(currentPage) {
            setElementProp('currentPage', currentPage);
          },
        }
      }
    />
  );
};

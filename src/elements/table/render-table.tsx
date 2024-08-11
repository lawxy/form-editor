import React, { useEffect, useMemo, useState } from 'react';
import { EditableProTable, ProTable } from '@ant-design/pro-components';

import { EEventAction } from '@/types';
import type { TElementRender } from '@/types';
import { parseJSX, idCreator } from '@/utils';
import { useDesignEffect, useFormUpdate, useRegisterEvents } from '@/hooks';

export const RenderTable: TElementRender = ({
  fieldValue = [{ id: 'row1', title: 'a' }],
  element,
  customStyle,
  setFieldValue,
}) => {
  const {
    // tableColumns = '[]',
    // tableAttributes = '{}',
    columns = [],
    linkLoading,
    readonly,
  } = element;

  const [tableColumns, setColumns] = useState([]);

  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  // const columns = useMemo(() => {
  //   return [
  //     ...parseJSX(tableColumns),
  //     !readonly && {
  //       title: '操作',
  //       valueType: 'option',
  //       width: 200,
  //       render: (text, record, _, action) => [
  //         <a
  //           key="editable"
  //           onClick={() => {
  //             action?.startEditable?.(record.id);
  //           }}
  //         >
  //           编辑
  //         </a>,
  //         <a
  //           key="delete"
  //           onClick={() => {
  //             // setDataSource(dataSource.filter((item) => item.id !== record.id));
  //           }}
  //         >
  //           删除
  //         </a>,
  //       ],
  //     },
  //   ].filter(Boolean);
  // }, [tableColumns, readonly]);

  // 使用useMemo会有bug，列展示不是预期效果
  useEffect(() => {
    const newColumns = [
      ...columns.map((column) => {
        const { name, field, fixed, width, align } = column;
        return {
          title: name,
          dataIndex: field,
          fixed,
          width,
          align,
          shouldCellUpdate: () => true,
        };
      }),
      !readonly && {
        title: '操作',
        valueType: 'option',
        width: 200,
        render: (text, record, _, action) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            onClick={() => {
              // setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
          >
            删除
          </a>,
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
      // {...parseJSX(`[${tableAttributes}]`)[0]}
      style={customStyle}
      onChange={(v) => {
        console.log(v);
        setFieldValue(v);
      }}
      recordCreatorProps={{
        record: () => ({ id: idCreator('row') }),
        creatorButtonText: '新增一行',
        style: {
          display: readonly ? 'none' : 'block',
        },
      }}
    />
  );
};

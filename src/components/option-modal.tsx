import React, { useState, useEffect, useRef } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Modal, Space, Input, message, type TableColumnProps } from 'antd';
import { cloneDeep } from 'lodash-es';
import { TableSortable } from '@roddan/ui';

import { MinusIcon, PlusIcon, QuestionPopover } from '@/components';
import type { TOption } from '@/types';
import { idCreator } from '@/utils';
import { BatchGenerateOptions } from './batch-generate-options';

export const OptionModal: FC<
  PropsWithChildren<{
    options: TOption[];
    onChange: (v: TOption[]) => void;
  }>
> = ({ children, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const [valueOptions, setOption] = useState<TOption[]>([]);
  const valueOptionsRef = useRef<TOption[]>();
  valueOptionsRef.current = valueOptions;

  useEffect(() => {
    setOption(options);
  }, [options]);

  const handleInputChange = (idx: number, field: keyof TOption, value: any) => {
    const newOptions = cloneDeep(valueOptions);
    newOptions[idx][field] = value;
    setOption(newOptions);
  };

  const judgeOptionsInvalid = () => {
    return valueOptions.some((item) => !item.label || !item.value);
  };

  const addOption = () => {
    if (judgeOptionsInvalid()) {
      message.error('属性或值不为空, 填写完整后再新增或保存');
      return;
    }
    const newOptions = cloneDeep(valueOptions);
    newOptions.push({ label: '', value: '', id: idCreator('option') });
    setOption(newOptions);
  };

  const columns: TableColumnProps<TOption>[] = [
    {
      title: '选项名',
      dataIndex: 'label',
      render(val: string, _: any, idx: number) {
        return (
          <Input
            value={val}
            onChange={(e) => {
              handleInputChange(idx, 'label', e.target.value);
            }}
          />
        );
      },
    },
    {
      title: '值',
      dataIndex: 'value',
      render(val: string, _: any, idx: number) {
        return (
          <Input
            value={val}
            onChange={(e) => {
              handleInputChange(idx, 'value', e.target.value);
            }}
          />
        );
      },
    },
    {
      title: '操作',
      width: 60,
      render(_, __, idx: number) {
        return (
          <Space>
            <span
              onClick={() => {
                const newOptions = cloneDeep(valueOptions);
                newOptions.splice(idx, 1);
                setOption(newOptions);
                if (!newOptions.length) {
                  setOption([
                    { label: '', value: '', id: idCreator('option') },
                  ]);
                }
              }}
            >
              <MinusIcon />
            </span>
            {idx === valueOptions.length - 1 && (
              <span onClick={addOption}>
                <PlusIcon />
              </span>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        open={open}
        title={
          <BatchGenerateOptions
            title="属性设置"
            options={valueOptions}
            setOptions={setOption}
            labelField="label"
            valueField="value"
          />
        }
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          if (judgeOptionsInvalid()) {
            message.error('属性或值不为空, 填写完整后再新增或保存');
            return;
          }
          onChange(valueOptions);
          setOpen(false);
        }}
      >
        <TableSortable
          onSort={(newDatas: any) => setOption(newDatas)}
          columns={columns}
          rowKey="id"
          dataSource={valueOptions}
          pagination={false}
          scroll={{ y: 300 }}
        />
      </Modal>
    </>
  );
};
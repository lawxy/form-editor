import { prefixCls } from '@/const';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Popover, Typography } from 'antd';
import React, { type FC, type PropsWithChildren } from 'react';
import styled from 'styled-components';

const EditItemDiv = styled.div(() => {
  return `
  background-color: var(--primary-color);
    border: 1px solid #ddd;
    border-radius: 2px;
    color: #333;
    margin-top: 8px;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    span.anticon {
      margin-left: 8px;
      cursor: pointer;
    }
  `;
});

export const EditItem: React.FC<{
  name: string;
  onEdit?: () => void;
  onCopy: () => void;
  onDelete: () => void;
  EditComponent?: FC<PropsWithChildren<any>>;
}> = ({ name, onEdit, onCopy, onDelete, EditComponent }) => {
  return (
    <EditItemDiv>
      <Typography.Text
        ellipsis={{
          tooltip: name,
        }}
        style={{ width: 200 }}
      >
        {name}
      </Typography.Text>
      <div className={prefixCls('service-item-operate')}>
        {EditComponent ? (
          <EditComponent>
            <Popover content="编辑">
              <EditOutlined />
            </Popover>
          </EditComponent>
        ) : (
          <Popover content="编辑">
            <EditOutlined onClick={() => onEdit?.()} />
          </Popover>
        )}

        <Popover content="复制">
          <CopyOutlined onClick={onCopy} />
        </Popover>
        <Popconfirm title="确认删除" placement="topLeft" onConfirm={onDelete}>
          <DeleteOutlined />
        </Popconfirm>
      </div>
    </EditItemDiv>
  );
};

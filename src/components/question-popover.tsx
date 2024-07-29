import React from 'react';
import { Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const QuestionPopover: React.FC<{
  content: React.ReactNode | string;
}> = ({ content }) => {
  return (
    <Popover content={content}>
      <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
    </Popover>
  );
};

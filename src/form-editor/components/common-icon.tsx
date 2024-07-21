import React from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

export const MinusIcon = (props: any) => (
  <MinusCircleOutlined
    style={{ color: '#D40000', cursor: 'pointer' }}
    {...(props || {})}
  />
);

export const PlusIcon = (props: any) => (
  <PlusCircleOutlined
    style={{ color: '#287DFA', cursor: 'pointer' }}
    {...props}
  />
);

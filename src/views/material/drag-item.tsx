import React from 'react';
import { prefixCls } from '@/const';
import type { IDragElementProp } from '@/types';

const DragItem: React.FC<{
  item: IDragElementProp;
}> = ({ item }) => {
  const { text, type, Icon } = item;
  return (
    <div className={prefixCls('drag-item')} data-type={type}>
      {Icon} {text}
    </div>
  );
};

export default DragItem;

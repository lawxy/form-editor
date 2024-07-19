import React from 'react';
import { prefixCls } from '@/const';
import { ElementsList } from '@/elements';
import type { IDragElementProp } from '@/types';
import { ReactSortable } from '@/components/react-sortable';

import DragItem from './drag-item';

import './style.less';

export const Material = () => {
  const mapList = Object.values(ElementsList);

  return (
    <div className={prefixCls('material')}>
      <div className={prefixCls('title')}>组件库</div>
      <div style={{ height: 10, backgroundColor: '#f5f5f5' }} />
      <ReactSortable
        list={mapList}
        className={prefixCls('element-wrap')}
        animation={150}
        sort={false}
        group={{ name: 'nested', pull: 'clone', put: false }}
      >
        {mapList.map((item: IDragElementProp) => (
          <DragItem key={item.type} item={item} />
        ))}
      </ReactSortable>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { prefixCls } from '@/const';
import { ElementsList } from '@/elements';
import type { IDragElementProp } from '@/types';

import DragItem from './drag-item';

import './style.less';

export const Material = () => {
  const el = useRef<any>();

  useEffect(() => {
    new Sortable(el.current, {
      animation: 150,
      sort: false,
      dragClass: 'dragClass-aaaa',
      group: { name: 'nested', pull: 'clone', put: false },
    });
  }, []);

  return (
    <div className={prefixCls('material')}>
      <div className={prefixCls('title')}>组件库</div>
      <div style={{ height: 10, backgroundColor: '#f5f5f5' }} />
      <div className={prefixCls('element-wrap')} ref={el}>
        {Object.values(ElementsList).map((item: IDragElementProp) => (
          <DragItem key={item.type} item={item} />
        ))}
      </div>
    </div>
  );
};

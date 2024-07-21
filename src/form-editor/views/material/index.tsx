import React, { useMemo } from 'react';
import { prefixCls } from '@/const';
import { ElementsList } from '@/elements';
import type { IDragElementProp } from '@/types';
import { ReactSortable } from '@/components/react-sortable';
import { CONTAINERS, FILTER_ELEMENT } from '@/const';

import DragItem from './drag-item';

import './style.less';

const titles = ['基础组件', '容器组件', '自定义组件'];

export const Material = () => {
  const renderList = useMemo(() => {
    const basic: IDragElementProp[] = [];
    const container: IDragElementProp[] = [];
    const custom: IDragElementProp[] = [];
    Object.entries(ElementsList)
      .filter(([name]) => !FILTER_ELEMENT.includes(name))
      .forEach(([name, el]) => {
        if (CONTAINERS.includes(name)) {
          container.push(el);
        } else {
          basic.push(el);
        }
      });
    return [basic, container, custom];
  }, [ElementsList]);

  return (
    <div className={prefixCls('material')}>
      <div className={prefixCls('title')}>组件库</div>
      <div style={{ height: 10, backgroundColor: '#f5f5f5' }} />
      {renderList.map((list, i) => (
        <React.Fragment key={i}>
          {!!list.length && (
            <>
              <div className={prefixCls('title')}>{titles[i]}</div>
              <ReactSortable
                list={list}
                className={prefixCls('element-wrap')}
                animation={150}
                sort={false}
                group={{ name: 'nested', pull: 'clone', put: false }}
                draggable={`.${prefixCls('drag-item')}`}
              >
                {list.map((item: IDragElementProp) => (
                  <DragItem key={item.type} item={item} />
                ))}
              </ReactSortable>
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

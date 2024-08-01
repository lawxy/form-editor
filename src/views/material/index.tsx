import React, { useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { prefixCls } from '@/const';
import { idCreator } from '@/utils';
import type { IDragElementProp } from '@/types';
import { ReactSortable } from '@roddan/ui';
import store from '@/store';
import { useEditorContext } from '@/context';

import DragItem from './drag-item';

import './style.less';

const titles = ['基础组件', '容器组件', '自定义组件'];

export const Material = observer(() => {
  const wrapEl = useRef<HTMLDivElement>(null);
  const { ElementsMap } = useEditorContext();

  const renderList = useMemo(() => {
    const basic: IDragElementProp[] = [];
    const container: IDragElementProp[] = [];
    const custom: IDragElementProp[] = [];
    Object.values(ElementsMap).forEach((el) => {
      const customMetadata = Reflect.getMetadata('custom', el);
      if (customMetadata) {
        custom.push(el);
        return;
      }
      if (el?.initialData?.isContainer) {
        container.push(el);
      } else {
        basic.push(el);
      }
    });
    return [basic, container, custom];
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const item = e.target as HTMLElement;
      if (item?.classList?.contains(prefixCls('drag-item'))) {
        const { type } = item.dataset;
        const { initialData } = ElementsMap[type!];
        store.appendEl({
          ...initialData,
          type,
          id: idCreator(),
          parentId: store.formAttrs.id,
        });
      }
    };

    wrapEl.current?.addEventListener('click', handleClick);
    return () => {
      wrapEl.current?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={prefixCls('material')} ref={wrapEl}>
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
});

import React, { useEffect, useRef, useContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import Sortable from 'sortablejs';
import { prefixCls } from '@/const';
import { ElementsList } from '@/elements/export';
import { EventContext } from '@/components/event-context';
import store from '@/store';
import type { IBaseElement, IEditorCanvasProp } from '@/types';
import { idCreator, handleOnEvent } from '@/utils';
import { useUpdate } from '@/hooks';

import './style.less';

const EditorCanvas: FC<PropsWithChildren<IEditorCanvasProp>> = ({
  mode,
  actions,
}) => {
  const { horizontalGap, verticalGap } = store.formAttrs;
  const el = useRef<any>();
  const { emitter } = useContext(EventContext);

  useEffect(() => {
    if (mode !== 'design') return;

    const rowEl = el.current.querySelector('.ant-row');

    const sortIns = new Sortable(rowEl, {
      animation: 150,
      group: 'list',
      onSort: function (e: any) {
        const { newIndex, item, oldIndex } = e;
        // 新增
        if (item.classList.contains('fm-drag-item')) {
          if (item.parentNode) item.parentNode.removeChild(item);
          const element = ElementsList[item.dataset.type];
          const { initialData } = element;
          store.insertEl(
            { type: item.dataset.type, ...initialData, id: idCreator() },
            newIndex,
          );
        } else {
          store.moveEl(oldIndex, newIndex);
        }
      },
    });

    return () => {
      sortIns?.destroy?.();
    };
  }, [mode]);

  useUpdate(() => {
    if (!store.formServices.length) return;
    store.formServices.forEach(serv => {
      emitter.on(serv.id!, handleOnEvent)
    })
    return () => {
      store.formServices.forEach(serv => {
        emitter.off(serv.id!, handleOnEvent)
      })
    }
  }, [emitter, store.formServices])

  return (
    <div className={prefixCls('canvas-wrap')}>
      {actions && <>{actions}</>}
      <div className={prefixCls('canvas')} ref={el}>
        {mode === 'design' && (
          <div style={{ height: 10, background: '#f3f3f3' }} />
        )}
        <Row gutter={[horizontalGap, verticalGap]} style={{ height: '100%' }}>
          {store.formElements.map((item: IBaseElement) => {
            const Component = ElementsList[item.type!]?.render;
            if (!Component) return null;
            return (
              <Component
                mode={mode}
                key={item.id || String(+new Date())}
                fieldValue={store.fieldValues[item.id as string]}
                element={item}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default observer(EditorCanvas);

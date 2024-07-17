import React, { useMemo, useRef } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import c from 'classnames';
import { useRegisterEvents, useFormUpdate, useDesignEffect } from '@/hooks';
import { EEventAction } from '@/types';
import { prefixCls } from '@/const';
import { ElementsList } from '@/elements/export';
import eventStore from '@/store/eventStore';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';
import { idCreator, handleOnEvent, parseCSS, handelSort } from '@/utils';

import './style.less';
export interface IEditorCanvasProp {
  /**
   * 表单模式
   */
  mode: TMode;
  /**
   * 表单操作按钮
   */
  actions?: React.ReactNode; // 表单操作按钮组
}

const EditorCanvas: FC<PropsWithChildren<IEditorCanvasProp>> = ({
  mode,
  actions,
}) => {
  const { horizontalGap, verticalGap, id, events, customCss } = store.formAttrs;
  const el = useRef<any>();
  const { eventFunctions } = useRegisterEvents({ id, events });
  const formStyle = useMemo(() => {
    if (!customCss) return {};
    const cssObj = parseCSS(customCss);
    return Object.values(cssObj)[0];
  }, [customCss]);

  useDesignEffect(() => {
    const rowEl = el.current.querySelector('.ant-row');

    const sortIns = new Sortable(rowEl, {
      animation: 150,
      group: 'nested',
      fallbackOnBody: true,
      // onMove() {
      //   // return false;
      // },
      onEnd: function (e: SortableEvent) {
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();
        console.log('onEnd');
      },
      onSort: function (e: SortableEvent) {
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();
        console.log('onSort');
        // if (e.to?.dataset.type === 'el') return;
        // const { newIndex, item, oldIndex } = e;
        // const { add, newEl } = handelSort(item, store.formAttrs.id!);
        // if (add) {
        //   store.insertEl(newEl!, newIndex!);
        // } else {
        //   store.moveEl(oldIndex!, newIndex!);
        // }
      },
    });

    return () => {
      sortIns?.destroy?.();
    };
  });

  useDesignEffect(() => {
    const keydonwFn = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && document.activeElement === document.body) {
        store.deleteEl(store.selectedElement);
      }
    };
    document.addEventListener('keydown', keydonwFn);
    return () => {
      document.removeEventListener('keydown', keydonwFn);
    };
  });

  // 表单加载事件
  useFormUpdate(() => {
    eventFunctions[EEventAction.FORM_LOADED]?.();
  }, [eventFunctions[EEventAction.FORM_LOADED]]);

  // 服务监听事件 - ps:不用关心设计模式下的运行
  useFormUpdate(() => {
    if (!store.formServices.length) return;
    store.formServices.forEach((serv) => {
      eventStore.emitter.on(serv.id!, handleOnEvent);
    });
    return () => {
      store.formServices.forEach((serv) => {
        eventStore.emitter.off(serv.id!, handleOnEvent);
      });
    };
  }, [store.formServices]);

  // console.log(JSON.stringify(store.formElements));

  return (
    <div className={prefixCls('canvas-wrap')}>
      {actions && <>{actions}</>}
      <div
        className={c([
          prefixCls('canvas'),
          mode === 'design' ? prefixCls('canvas-design') : '',
        ])}
        style={formStyle}
        ref={el}
      >
        <Row className={prefixCls('row')} gutter={[horizontalGap, verticalGap]}>
          {store.formElements.map((item: IBaseElement) => {
            const Component = ElementsList[item.type!]?.render;
            if (!Component) return null;
            store.flatElement(item);
            return (
              <Component
                key={item.id}
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

import React, { useEffect, useMemo, useRef } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import Sortable from 'sortablejs';
import c from 'classnames';
import { useRegisterEvents, useFormUpdate, useDesignEffect } from '@/hooks';
import { EEventAction } from '@/types';
import { prefixCls } from '@/const';
import { ElementsList } from '@/elements/export';
import { useEventContext } from '@/components';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';
import { idCreator, handleOnEvent, parseCSS } from '@/utils';

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
  const { emitter } = useEventContext();
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
  });

  useDesignEffect(() => {
    const keydonwFn = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
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
      emitter.on(serv.id!, handleOnEvent);
    });
    return () => {
      store.formServices.forEach((serv) => {
        emitter.off(serv.id!, handleOnEvent);
      });
    };
  }, [emitter, store.formServices]);

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
            return (
              <Component
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

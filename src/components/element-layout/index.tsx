import React, { useCallback, useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Col, Form } from 'antd';
import { Rule } from 'antd/es/form';
import { observer } from 'mobx-react-lite';
import { cloneDeep } from 'lodash-es';
import c from 'classnames';
import store from '@/store';
import { prefixCls } from '@/const';
import { useElementCommon } from '@/hooks';
import { useEditorContext } from '@/context';
import type { IBaseElement } from '../../types';
import { WrapEl } from './wrap-el';
import './style.less';

export const ElementLayout: FC<
  PropsWithChildren<{
    element: IBaseElement;
  }>
> = observer(({ element, children }) => {
  const {
    elementName,
    elementNameDisplay,
    id,
    gridOffset,
    gridSpan,
    showElementName,
    gridLayout,
    regExps,
    parentId,
    type,
  } = element;
  const { elCss, contaninerCss } = useElementCommon(element);
  const { mode } = useEditorContext();

  // 自定义css样式
  const style = useMemo(() => {
    const finnalStyle: React.CSSProperties = contaninerCss
      ? cloneDeep(contaninerCss)
      : {};

    if (!gridLayout) {
      Object.assign(finnalStyle, {
        flex: 'none',
        maxWidth: 'inherit',
      });
    }
    return finnalStyle;
  }, [contaninerCss, gridLayout]);

  // 校验规则
  const rules = useMemo<Rule[]>(() => {
    if (!regExps?.length) return [];
    const arr = [];
    const requiredRule = regExps[0];
    arr.push({
      required: requiredRule?.enable,
      message: requiredRule?.message,
    });
    regExps
      .slice(1)
      .filter((item) => item.enable && item.regexp && item.message)
      .forEach((patternItem) => {
        arr.push({
          validator(_: any, value: any = '') {
            const reg = new RegExp(patternItem.regexp as string);
            if (value?.match(reg)) {
              return Promise.resolve();
            }
            return Promise.reject(patternItem.message);
          },
        });
      });
    return arr;
  }, [regExps]);

  // 偏移量值 仅使用栅格布局才生效
  const offset = gridLayout ? gridOffset || 0 : 0;

  return (
    <Col
      span={gridSpan}
      offset={offset}
      style={style}
      data-parent-id={parentId}
      data-id={id}
      data-type={type}
    >
      <Form.Item name={id} rules={rules} style={{ marginBottom: 0 }}>
        <WrapEl el={element} mode={mode}>
          <div
            className={c({
              [prefixCls('with-element-name')]: true,
              [prefixCls('with-element-name-horizontal')]:
                elementNameDisplay === 'horizontal',
            })}
          >
            {showElementName && (
              <div
                dangerouslySetInnerHTML={{
                  __html: elementName as string,
                }}
                className={
                  // @ts-ignore
                  rules?.[0]?.required ? prefixCls('title-required') : ''
                }
              />
            )}
            <div style={{ flex: 1 }}>
              {React.isValidElement(children) &&
                React.cloneElement<any>(children, {
                  ...(children?.props || {}),
                  customStyle: elCss || {},
                })}
            </div>
          </div>
        </WrapEl>
      </Form.Item>
    </Col>
  );
});

export const RenderElementWithLayout: FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const { ElementsMap } = useEditorContext();

  const Component = useMemo(() => {
    const RenderComponent = ElementsMap[element.type!]?.render;
    if (!RenderComponent) return null;
    return RenderComponent;
  }, [element.type, ElementsMap]);

  const setFieldValue = useCallback((value: any) => {
    store.setFieldValue(element.id!, value)
  }, [element.id])

  if (!Component) return null;

  return (
    <ElementLayout element={element}>
      <Component
        fieldValue={store.fieldValues[element.id as string]}
        setFieldValue={setFieldValue}
        element={element}
      />
    </ElementLayout>
  );
};

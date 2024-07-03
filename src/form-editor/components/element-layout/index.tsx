import React, { useMemo, useContext } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Col, Form } from 'antd';
import { Rule } from 'antd/es/form';
import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';
import { cloneDeep } from 'lodash-es';
import { useElementCommon } from '@/hooks';
import { EditorContext } from '@/context';
import type { IBaseElement, TDirection, TPattern } from '../../types';
import { WrapEl } from './wrap-el';

const StyledDiv = styled.div<{ elementNameDisplay?: TDirection }>(
  ({ elementNameDisplay }) => {
    return `
    ${css({
      display: 'flex',
      flexDirection: elementNameDisplay === 'horizontal' ? 'row' : 'column',
      alignItems: elementNameDisplay === 'horizontal' ? 'center' : '',
    }).join(';')}
    .title-required::before {
      display: inline-block;
      margin-inline-end: 4px;
      color: #ff4d4f;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*";
    }
  `;
  },
);

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
  } = element;
  const { elCss, contaninerCss } = useElementCommon(element);
  const { mode } = useContext(EditorContext);

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
    <Col span={gridSpan} offset={offset} style={style}>
      <Form.Item name={id} rules={rules} style={{ marginBottom: 0 }}>
        <WrapEl el={element} mode={mode}>
          <StyledDiv elementNameDisplay={elementNameDisplay}>
            {showElementName && (
              <div
                dangerouslySetInnerHTML={{
                  __html: elementName as string,
                }}
                // @ts-ignore
                className={rules?.[0]?.required ? 'title-required' : ''}
              />
            )}
            <div style={{ flex: 1 }}>
              {React.isValidElement(children) &&
                React.cloneElement<any>(children, {
                  style: elCss || {},
                })}
            </div>
          </StyledDiv>
        </WrapEl>
      </Form.Item>
    </Col>
  );
});

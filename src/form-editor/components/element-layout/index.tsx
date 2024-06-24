import React, { useMemo, useContext } from 'react';
import type { FC, PropsWithChildren } from 'react'
import { Col, Form } from 'antd';
import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';
import { useElementCommon } from '@/hooks'
import { EditorContext } from '@/context';
import type { IBaseElement, TDirection } from '../../types';
import { WrapEl } from './wrap-el';

const StyledDiv = styled.div<{ elementNameDisplay?: TDirection }>(
  ({ elementNameDisplay }) => {
    return `
    ${css({
      display: 'flex',
      flexDirection: elementNameDisplay === 'horizontal' ? 'row' : 'column',
      alignItems: elementNameDisplay === 'horizontal' ? 'center' : '',
    }).join(';')}
  `;
  },
);

const ElementLayout: FC<
  PropsWithChildren<{
    element: IBaseElement;
  }>
> = ({ element, children }) => {
  const {
    elementName,
    elementNameDisplay,
    id,
    gridOffset,
    gridSpan,
    showElementName,
    gridLayout
  } = element;
  const { elCss, contaninerCss } = useElementCommon(element);
  const { mode } = useContext(EditorContext);

  const style = useMemo(() => {
    const finnalStyle: React.CSSProperties = contaninerCss || {};
    if (!gridLayout) {
      Object.assign(finnalStyle, {
        flex: 'none',
        maxWidth: 'inherit',
      })
    }
    return finnalStyle

  }, [contaninerCss, gridLayout])

  const offset = gridLayout ? 0 : (gridOffset || 0);

  return (
    <Col span={gridSpan} offset={offset} style={style}>
      <Form.Item name={id} style={{ marginBottom: 0 }}>
        <WrapEl el={element} mode={mode}>
          <StyledDiv elementNameDisplay={elementNameDisplay}>
            {showElementName && (
              <div
                dangerouslySetInnerHTML={{
                  __html: elementName as string,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              {React.isValidElement(children) &&
                React.cloneElement<any>(children, {
                  style: elCss || {}
                })}
            </div>
          </StyledDiv>
        </WrapEl>
      </Form.Item>
    </Col>
  );
};
export default observer(ElementLayout);

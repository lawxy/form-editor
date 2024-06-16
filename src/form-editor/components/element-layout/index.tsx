import { Col, Form } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { type FC, type PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import type { IBaseElement, TDirection, TMode } from '../../types';
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
    mode: TMode;
    contaninerCss?: React.CSSProperties;
  }>
> = ({ element, children, mode, contaninerCss = {} }) => {
  const {
    elementName,
    elementNameDisplay,
    id,
    gridOffset,
    gridSpan,
    showElementName,
  } = element;

  return (
    <Col span={gridSpan} offset={gridOffset || 0} style={contaninerCss}>
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
            <div style={{ flex: 1 }}>{children}</div>
          </StyledDiv>
        </WrapEl>
      </Form.Item>
    </Col>
  );
};
export default observer(ElementLayout);

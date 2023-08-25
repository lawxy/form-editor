import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import SectionLeft from './section-left';
import SectionRight from './section-right';

const StyledDiv = styled.div(() => {
  return `
    display: flex;
    .ant-input-search {
      width: 50%;
      margin-right:
    }
  `;
});

const SelectSection = () => {
  return (
    <StyledDiv>
      <SectionLeft />
      <SectionRight />
    </StyledDiv>
  );
};
export default observer(SelectSection);

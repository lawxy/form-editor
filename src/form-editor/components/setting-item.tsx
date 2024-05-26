import React from "react";
import { Input } from 'antd';

import styled, { css } from 'styled-components'

const StyledDiv = styled.div<{required: boolean}>(({required}) => {
  return `
    display: flex;
    height: 30px;
    align-items: center;
    padding: 0 4px;
    margin-bottom: 20px;
    position: relative;
    .form-editor-setting-item-label {
      width: 100px;
      text-align: right;
      &::after{
        content: ":";
        position: relative;
        margin-block: 0;
        margin-inline-start: 2px;
        margin-inline-end: 8px;
      }
      &::before {
        display: ${required ? 'inline-block' : 'none'};
        margin-inline-end: 4px;
        color: #ff4d4f;
        font-size: 14px;
        font-family: SimSun,sans-serif;
        line-height: 1;
        content: "*";
      }
    }
  `
})

export const SettingItem: React.FC<{
  label: string;
  children: React.ReactNode;
  required?: boolean;
}> = ({label, children, required}) => {
  return (
    <StyledDiv required={!!required}>
      <div className="form-editor-setting-item-label">{label}</div>
      <div style={{flex: 1}}>{children}</div>
    </StyledDiv>
  )
}
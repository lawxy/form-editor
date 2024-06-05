import React, { type FC, type PropsWithChildren } from "react";
import styled from 'styled-components'

const StyledDiv = styled.div<{required: boolean}>(({required}) => {
  return `
    display: flex;
    height: 30px;
    align-items: center;
    padding: 0 4px;
    margin-bottom: 20px;
    position: relative;
    font-size: 13px;
    .fm-setting-item-label {
      width: 85px;
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
    .fm-setting-item-value {
      flex: 1;
    }
  `
})

export const SettingItem: FC<PropsWithChildren<{
  label: React.ReactNode | string;
  children: React.ReactNode;
  required?: boolean;
}>> = ({label, children, required}) => {
  return (
    <StyledDiv required={!!required}>
      <div className="fm-setting-item-label">{label}</div>
      <div className="fm-setting-item-value">{children}</div>
    </StyledDiv>
  )
}
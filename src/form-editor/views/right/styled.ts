import styled from 'styled-components'

export const StyledRightDiv = styled.div(() => {
  return `
    width: 350px;
    background-color: white;
    height: 100%;
    overflow: auto;
    .ant-tabs-nav {
      height: 40px;
    }
    .ant-tabs-tab {
      padding: 0 30%;
    }
    .ant-tabs-content {
      padding-right: 8px;
    }
    .ant-select, .ant-input {
      width: 100%;
    }
    .ant-form-item {
      margin-bottom: 0;
    }
    .ant-form-item-explain {
      position: absolute;
      z-index: 10;
    }
  `
})

export const SettingWrap = styled.div(() => {
  return `
    padding: 2px;
  `
})

import styled from 'styled-components'

export const StyledRightDiv = styled.div(() => {
  return `
    width: 350px;
    background-color: white;
    height: 100%;
    overflow: auto;
    .fm-form-setting-tab > .ant-tabs-nav {
      margin-bottom: 0;
    }
    .ant-tabs-nav {
      height: 40px;
    }
    .ant-tabs-tab {
      padding: 0 12%;
    }
    .ant-tabs-content {
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
    .fm-attr-setting-btn {
      position: absolute;
      right: 8px;
      top: 3px;
    }
  `
})

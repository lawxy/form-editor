import styled from 'styled-components'

export const ActionGroupWrap = styled.div(() => {
  return `
    display: flex;
    height: 40px;
    margin-bottom: 10px;
    background-color: white;
    align-items: center;
    justify-content: flex-end;
    .ant-btn-primary {
      background-color: #4096ff;
    }
  `
})

export const GroupItem = styled.div(() => {
  return `
    color: #1677ff;
    font-size: 14px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      color: #69b1ff;
    }
  `
})
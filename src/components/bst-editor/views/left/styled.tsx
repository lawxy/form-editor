import styled from 'styled-components'

export const StyledLeftDiv = styled.div(() => {
  return `
    width: 300px;
    height: 100%;
    background-color: white;
  `
})

export const ElementWrap = styled.div(() => {
  return `
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 8px;
  `
})

export const StyledItemDiv = styled.div(() => {
  return `
    width: 48%;
    text-align: center;
    align-items: center;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;
    border-radius: 2px;
    box-sizing: border-box;
    color: #333;
    cursor: move;
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    overflow: hidden;
    padding: 0 4px;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover{
      border: 1px dashed #409eff;
      color: #409eff;
    }
  `
})

import React from 'react'
import styled, { css } from 'styled-components'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import store from '@/store'

const StyledDiv = styled.div(() => {
  return `
    ${css({
      position: 'absolute',
      right: 0,
      top: -8,
      display: 'flex',
      zIndex: 20
    }).join(';')}
    .form-editor-selected-action{
      ${css({
        marginRight: 6,
        borderColor: '#409EFF',
        color: '#409EFF',
        background: '#fff',
        width: 22,
        height: 22,
        lineHeight: '20px',
        textAlign: 'center',
        borderRadius: '50%',
        fontSize: 12,
        border: '1px solid',
        cursor: 'pointer'
      }).join(';')}
      :hover {
        color: white;
      }
    }
    .copy-action:hover {
      background: #409EFF;
    }
    .delete-action {
      border-color: #F56C6C;
      color: #F56C6C;
    }
    .delete-action:hover {
      background: #F56C6C;
    }
  `
})

export const SelectedActions = () => {
  return (
    <StyledDiv>
      <div 
        className='form-editor-selected-action copy-action'
        onClick={() => {
          const newEl = store.copyEl(store.selectedElement)
          store.setSelectedElement(newEl)
        }}
      >
        <CopyOutlined />
      </div>
      <div 
        className='form-editor-selected-action delete-action'
        onClick={() => {
          store.deleteEl(store.selectedElement)
          store.setSelectedElement({})
        }}
      >
        <DeleteOutlined />
      </div>
    </StyledDiv>
  )
}
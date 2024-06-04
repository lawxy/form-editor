import styled, { css } from 'styled-components';

export const HoverLine = styled.div<{ pos: 'top' | 'bottom' }>(({ pos }) => {
  return `
    width: 100%;
    height: 2px;
    background-color: #3370ff;
    position: absolute;
    left: 0;
    ${css({
      top: pos === 'top' ? 0 : undefined,
      bottom: pos === 'bottom' ? 0 : undefined,
    }).join(';')}
  `;
});

export const Mask = styled.div<{ horizontal: number; vertical: number }>(
  ({ horizontal, vertical }) => {
    return `
    ${css({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // margin: 'auto',
      padding: `${vertical / 2}px ${horizontal / 2}px`,
      margin: `-${vertical / 2}px -${horizontal / 2}px`,
      zIndex: 10,
      cursor: 'pointer',
    }).join(';')}
  `;
  },
);

export const DesignWrapDiv = styled.div<{
  selected: boolean;
}>(({ selected }) => {
  return `
    border-radius: 4px;
    &:hover {
      border: 1px dashed #3370ff;
    }
    position: relative;
    ${css({
      border: selected
        ? '1px solid #3370ff !important'
        : '1px solid transparent',
    }).join(';')}
  `;
});

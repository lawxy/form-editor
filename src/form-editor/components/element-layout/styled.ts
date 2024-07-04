import styled, { css } from 'styled-components';

export const Mask = styled.div<{ horizontal: number; vertical: number }>(
  ({ horizontal, vertical }) => {
    return `
    ${css({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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

export const EventIcon = styled.div(() => {
  return `
  position: absolute;
  top: -8px;
  left: 8px;
  &::after {
    position: absolute;
    width: 14px;
    height: 14px;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDnlpIfku708L3RpdGxlPgogICAgPGcgaWQ9IjguNOihqOWNleaWh+S5pue8lui+keWZqCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjguNC4xLjIt5Z+656GA57uE5Lu2LeaWh+acrC3kuovku7YiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDE1LjAwMDAwMCwgLTEzNDMuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOeWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxNS4wMDAwMDAsIDEzNDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSLmpK3lnIblvaIiIGZpbGw9IiNGRkFDNUUiIGN4PSI3LjkyMzgwOTUyIiBjeT0iNy45MjM4MDk1MiIgcj0iNy45MjM4MDk1MiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjA5NTIzOCwgMy42NTcxNDMpIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSLot6/lvoQiIHBvaW50cz0iNC44ODY4NTcxNCAwLjAwMTE0Mjg1NzE0IDIuOTM2IDMuOTAxNzE0MjkgNC44ODY4NTcxNCAzLjkwMTcxNDI5IDEuNDczMTQyODYgOS43NTMxNDI4NiAxLjQ3MzE0Mjg2IDUuMzY0NTcxNDMgMC4wMTAyODU3MTQzIDUuMzY0NTcxNDMgMC4wMTAyODU3MTQzIDAuMDAxMTQyODU3MTQgNC44ODY4NTcxNCAwLjAwMTE0Mjg1NzE0Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==');
    background-size: 100%;
    content: '';
  }
  `;
});

---
group:
  title: 基本用法
order: 3
---

# 事件

组件设置事件后，会出现图标![Description](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDnlpIfku708L3RpdGxlPgogICAgPGcgaWQ9IjguNOihqOWNleaWh+S5pue8lui+keWZqCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjguNC4xLjIt5Z+656GA57uE5Lu2LeaWh+acrC3kuovku7YiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDE1LjAwMDAwMCwgLTEzNDMuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOeWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxNS4wMDAwMDAsIDEzNDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSLmpK3lnIblvaIiIGZpbGw9IiNGRkFDNUUiIGN4PSI3LjkyMzgwOTUyIiBjeT0iNy45MjM4MDk1MiIgcj0iNy45MjM4MDk1MiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjA5NTIzOCwgMy42NTcxNDMpIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSLot6/lvoQiIHBvaW50cz0iNC44ODY4NTcxNCAwLjAwMTE0Mjg1NzE0IDIuOTM2IDMuOTAxNzE0MjkgNC44ODY4NTcxNCAzLjkwMTcxNDI5IDEuNDczMTQyODYgOS43NTMxNDI4NiAxLjQ3MzE0Mjg2IDUuMzY0NTcxNDMgMC4wMTAyODU3MTQzIDUuMzY0NTcxNDMgMC4wMTAyODU3MTQzIDAuMDAxMTQyODU3MTQgNC44ODY4NTcxNCAwLjAwMTE0Mjg1NzE0Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)
进行提示，如果事件相关联的组件或服务（比如同步组件值，关联服务）被删除则会展示另一个图标![Description](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+57yW57uEIDnlpIfku70gNTwvdGl0bGU+CiAgICA8ZyBpZD0iOC406KGo5Y2V5paH5Lmm57yW6L6R5ZmoIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iOC40LjEuMi3ln7rnoYDnu4Tku7Yt5paH5pysLeS6i+S7tiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMTUuMDAwMDAwLCAtMTM5Mi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC055aSH5Lu9LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMTUuMDAwMDAwLCAxMzkyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2iIiBmaWxsPSIjQkZCRkJGIiBjeD0iNy45MjM4MDk1MiIgY3k9IjcuOTIzODA5NTIiIHI9IjcuOTIzODA5NTIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9Iui3r+W+hCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBwb2ludHM9IjEwLjk4MjA5NTIgMy42NTgyODU3MSA5LjAzMTIzODEgNy41NTg4NTcxNCAxMC45ODIwOTUyIDcuNTU4ODU3MTQgNy41NjgzODA5NSAxMy40MTAyODU3IDcuNTY4MzgwOTUgOS4wMjE3MTQyOSA2LjEwNTUyMzgxIDkuMDIxNzE0MjkgNi4xMDU1MjM4MSAzLjY1ODI4NTcxIDEwLjk4MjA5NTIgMy42NTgyODU3MSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMuMTgzMzgxMSwyLjExMzAyMTM1IEMzLjM3MzM1NjU4LDEuOTU3NTg2ODcgMy42NDMzNjI4MiwxLjk2NTIwNjE2IDMuODIzODMxMjYsMi4xMTg5MjIzNiBMMy44ODY5Nzg2NSwyLjE4MzM4MTEgTDEyLjg4Njk3ODYsMTMuMTgzMzgxMSBDMTMuMDYxODQyNCwxMy4zOTcxMDM1IDEzLjAzMDM0MTMsMTMuNzEyMTE0OSAxMi44MTY2MTg5LDEzLjg4Njk3ODYgQzEyLjYyNjY0MzQsMTQuMDQyNDEzMSAxMi4zNTY2MzcyLDE0LjAzNDc5MzggMTIuMTc2MTY4NywxMy44ODEwNzc2IEwxMi4xMTMwMjE0LDEzLjgxNjYxODkgTDMuMTEzMDIxMzUsMi44MTY2MTg5IEMyLjkzODE1NzU2LDIuNjAyODk2NDkgMi45Njk2NTg3LDIuMjg3ODg1MTQgMy4xODMzODExLDIuMTEzMDIxMzUgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)。

编辑事件时，动作相关配置<b>尽量填写完整</b>（串联和事件防重可不填选），否则事件可能不会执行。

动作相关配置和组件事件标签栏都可以进行拖拽排序，如果事件设置串联则需要调整好顺序。串联功能主要是考虑到表单提交前需要进行校验。

<b>值发生变化</b>事件: 顾名思义，组件的表单值发生变化执行的事件。<b>表格</b>组件只有新增<b>保存</b>或<b>删除</b>行数据才会触发，表格内元素编辑时不会触发。

## 更新服务

参数配置：

- <b>提交表单</b>和<b>更新</b>是将数据以 data 传给接口。表格组件会将表单值、当前编辑数据和页码上传，其它组件只上传表单值。
- <b>拼接</b>是将数据拼到 url 上传入，清空是将 data 和 params 都设置为空。
- 不管是更新还是拼接，参数设置后会存储下来，在刷新服务时统一提交。

<video width="640" height="360" controls>
  <source src="https://roddan.cn/editor-assets/update-service.mp4" type="video/mp4">
</video>

## 关联服务

关联服务仅在<b>组件加载后</b>的事件中可选择，主要作用是获取接口数据设置表单值。

获取结果字段：

- 指获取接口返回值字段，默认是 data，可以自定义设置，例如 data.a.b。

更新组件：

- <b>值：</b>表单值；
- <b>选项：</b>目前只有下拉、单选、多选中可用；
- <b>自定义字段：</b>大部分场景是用于自定义组件中，当然可以设置<b>column</b>字段作用于表格的列设置。

<b>表格、下拉、按钮</b>设置关联服务后，接口请求期间会有 loading 效果。

表格组件如果需要分页获取数据，接口一定要返回数据<b>总量</b>并更新在组件<b>total</b>字段上，另外<b>分页切换时事件</b>上传的数据是当前页码和分页条数，比如当前页 2、分页数 20，上传数据为'2,20'

```javascript
// 数据源
const tableData = Array.from({ length: 40 }, (_, idx) => {
  return {
    id: `${idx}`,
    select: `select${idx}`,
    radio: `radio${idx}${idx}`,
    checkbox: `checkbox${idx}`,
    input: `input${idx}`,
    number: `number${idx}`,
  };
});

// 分页获取数据
@Post("getTableData2")
async getTable2Data(@Body() filterDto: any = {}) {
  await sleep(2000)
  let {
    pageData,
    initPageData: { page, pageSize },
  } = filterDto;
  if (pageData) {
    [page, pageSize] = pageData.split(",");
  }
  return {
    code: 200,
    data: tableData.slice((page - 1) * pageSize, page * pageSize),
    total: tableData.length,
  };
}
```

---
group:
  title: 基本用法
order: 2
---
# 服务
接口和服务一一对应，在<b>表单服务</b>标签页中进行设置编辑，默认接口返回{ code: 200, data: xxx }形式。拦截器设置中可用console打印日志，也可以用antd的message方法进行全局提示。例如设置token:
```javascript
axios.interceptors.request.use(config =>{
  console.log(config)
  config['headers'] = {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
  return config
})

const DEFAULT_ERROR_MESSAGE = '请求服务报错';

const HttpStatusCode = { Ok: 200 };

axios.interceptors.response.use(function (res) {
  try {
    const { code } = res.data || {};
    if (HttpStatusCode.Ok === code) {
      return res.data;
    }
    message.error(errMsg || DEFAULT_ERROR_MESSAGE);
  } catch (e) {
    message.error(DEFAULT_ERROR_MESSAGE);
  }
},
function (err) {
  message.error(err?.message || DEFAULT_ERROR_MESSAGE);
  return Promise.reject(err);
})
```
设置以后，点击<b>复制服务</b>就可以避免重复操作headers。

服务预览时，当请求方法是 GET, DELETE, HEAD, OPTIONS, LINK, UNLINK 中的一个，预览参数会拼接在接口名上。其他请求方式则是向接口传入<b>data</b>。
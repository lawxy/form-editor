---
group:
  title: 基本用法
order: 4
---

# 下载页面
本想部署一个服务，点击下载按钮时通过schema生成可直接部署服务器的页面，奈何试了几种方式都有各种问题。所以目前只能下载一个页面模板，需要自己导入schema。

具体步骤：
1. 下载静态模板
2. 点击<b>查看Schema</b>复制数据
3. 将数据粘贴到<b>default-value.js</b>中，window.GLOBAL_FORM_EDITOR_DEFAULT_VALUE = 你的schema

比如：
```javascript
window.GLOBAL_FORM_EDITOR_DEFAULT_VALUE = {
  "formElements": [
    {
      "type": "fe-input",
      "elementName": "输入框",
      "textType": "single",
      "gridSpan": 4,
      "autoSize": true,
      "placeholder": "请输入",
      "id": "el-mc8h3tn54j8",
      "parentId": "form-o6jcsla52uo"
    },
    {
      "type": "fe-select",
      "elementName": "下拉框",
      "gridSpan": 4,
      "gridLayout": true,
      "placeholder": "请选择",
      "valueOptions": [
        {
          "label": "选项1",
          "value": "1",
          "id": "1"
        },
        {
          "label": "选项2",
          "value": "2",
          "id": "2"
        }
      ],
      "id": "el-q9jof9grmq8",
      "parentId": "form-o6jcsla52uo"
    },
    {
      "type": "fe-input",
      "elementName": "输入框",
      "textType": "single",
      "gridSpan": 4,
      "autoSize": true,
      "placeholder": "请输入",
      "id": "el-ekndjhjd95o",
      "parentId": "form-o6jcsla52uo"
    }
  ],
  "fieldValues": {},
  "formAttrs": {
    "horizontalGap": 8,
    "verticalGap": 8,
    "customCss": "#form {\n\tpadding: 10px;\n\twidth: 1000px;\n\tmargin: 0 auto;\n}",
    "id": "form-o6jcsla52uo",
    "formName": "我的表单"
  },
  "formServices": [
    {
      "name": "timeout",
      "url": "http://localhost:8888/timeout",
      "method": "GET",
      "interceptors": "axios.interceptors.request.use(config =>{\n  return config\n})\n\nconst DEFAULT_ERROR_MESSAGE = '请求服务报错';\n\nconst HttpStatusCode = { Ok: 200 };\n\naxios.interceptors.response.use(function (res) {\n  try {\n    if (res.status !== HttpStatusCode.Ok) {\n      message.error(DEFAULT_ERROR_MESSAGE);\n      return {};\n    }\n    const { code } = res.data;\n    if (HttpStatusCode.Ok === code) {\n      return res.data;\n    }\n    message.error(errMsg || DEFAULT_ERROR_MESSAGE);\n  } catch (e) {\n    message.error(DEFAULT_ERROR_MESSAGE);\n  }\n},\nfunction (err) {\n  message.error(err?.message || DEFAULT_ERROR_MESSAGE);\n  return Promise.reject(err);\n})\n",
      "id": "service-nneenc6ovc8"
    },
    {
      "name": "other",
      "url": "http://localhost:8888/code",
      "method": "GET",
      "interceptors": "axios.interceptors.request.use(config =>{\n  return config\n})\n\nconst DEFAULT_ERROR_MESSAGE = '请求服务报错';\n\nconst HttpStatusCode = { Ok: 200 };\n\naxios.interceptors.response.use(function (res) {\n  try {\n    if (res.status !== HttpStatusCode.Ok) {\n      message.error(DEFAULT_ERROR_MESSAGE);\n      return {};\n    }\n    const { code } = res.data;\n    if ('000000' === code) {\n      return res.data;\n    }\n    message.error(errMsg || DEFAULT_ERROR_MESSAGE);\n  } catch (e) {\n    message.error(DEFAULT_ERROR_MESSAGE);\n  }\n},\nfunction (err) {\n  message.error(err?.message || DEFAULT_ERROR_MESSAGE);\n  return Promise.reject(err);\n})\n",
      "id": "service-c32dsu8jfq8"
    },
    {
      "name": "getStyle",
      "url": "http://localhost:8888/style",
      "method": "GET",
      "interceptors": "axios.interceptors.request.use(config =>{\n  return config\n})\n\nconst DEFAULT_ERROR_MESSAGE = '请求服务报错';\n\nconst HttpStatusCode = { Ok: 200 };\n\naxios.interceptors.response.use(function (res) {\n  try {\n    const { code } = res.data || {};\n    if (HttpStatusCode.Ok === code) {\n      return res.data;\n    }\n    message.error(errMsg || DEFAULT_ERROR_MESSAGE);\n  } catch (e) {\n    message.error(DEFAULT_ERROR_MESSAGE);\n  }\n},\nfunction (err) {\n  message.error(err?.message || DEFAULT_ERROR_MESSAGE);\n  return Promise.reject(err);\n})\n",
      "id": "service-ih3sago4eag",
      "linkingElements": []
    }
  ]
}
```

4. 部署服务器
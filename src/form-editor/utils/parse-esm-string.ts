/**
 * @param jsString 需要解析的js字符串
 * @param valueWhenError 解析出错时的默认返回值
 */
export function parseEsmString(jsString: string, valueWhenError?: any) {
  try {
    const formattedString = jsString.replace('export default', '');
    return {
      formattedString,
      value: new Function(`return ${formattedString}`)(),
    };
  } catch (e) {
    console.log('js解析错误');
    console.log(jsString);
    if (valueWhenError) {
      return {
        formattedString: jsString,
        value: valueWhenError,
      };
    }
    throw new Error('js解析错误');
  }
}

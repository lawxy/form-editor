
export function parseEsmString(jsString: string) {
  const formattedString = jsString.replace('export default', '');
  return {
    str: formattedString,
    obj: new Function(`return ${formattedString}`)()
  }
}

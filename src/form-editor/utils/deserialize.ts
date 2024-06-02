export function deserialize(serializedJavascript: string){
  return eval('(' + serializedJavascript + ')');
}
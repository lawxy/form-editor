export const getValueFromInput = (val?: string): any => {
  if (!val) return '';
  try {
    let realVal: any;
    eval(`realVal=${val}`);
    return realVal;
  } catch {
    return val;
  }
};

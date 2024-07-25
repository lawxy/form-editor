/**
 * 解决utils中使用store导致循环引用的问题
 */
export const dynamicGetStore = () => {
  return require('@/store').default; // 使用 require 动态加载
};

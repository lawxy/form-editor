/**
 * 解决utils中使用store导致循环引用的问题
 */
export const dynamicGetStore = async () => {
  // return require('@/store').default; // 使用 require 动态加载
  const store = await import('@/store');
  return store.default;
};

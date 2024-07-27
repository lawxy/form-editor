/**
 * 解决utils中使用store导致循环引用的问题，并且兼容vite
 */
export const dynamicGetStore = () => {
  const module = require('@/store');
  return module.default || module;
};

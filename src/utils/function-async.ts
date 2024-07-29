import lodash from 'lodash-es';

type DebounceOrThrottle = 'debounce' | 'throttle';

type TFunc = (...args: any[]) => Promise<any> | any;

type AsyncFunction<T extends TFunc> = (
  type: DebounceOrThrottle,
  func: T,
  wait: number,
) => (...args: Parameters<T>) => Promise<ReturnType<T>>;

const asyncFunction: AsyncFunction<TFunc> = (type, func, wait) => {
  // @ts-ignore
  const prosifyFunc = lodash[type]((resolve, reject, args) => {
    Promise.resolve(func(...args))
      .then(resolve)
      .catch(reject);
  }, wait);

  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      prosifyFunc(resolve, reject, args);
    });
};

export const asyncDebounce = <T extends TFunc>(func: T, wait: number) =>
  asyncFunction('debounce', func, wait);

export const asyncThrottle = <T extends TFunc>(func: T, wait: number) =>
  asyncFunction('throttle', func, wait);

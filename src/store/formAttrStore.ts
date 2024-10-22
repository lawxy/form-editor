import { IFormAttributesProps } from '@/types';
import { IFormAttrStore, IBaseStore } from './types';

export default {
  /**
   * 表单属性
   */
  formAttrs: {},

  setFormAttrs(attrs: IFormAttributesProps) {
    this.formAttrs = attrs;
  },

  setFormAttr(key, value) {
    this.formAttrs[key] = value;
  },
} as Pick<IBaseStore, keyof IFormAttrStore>;

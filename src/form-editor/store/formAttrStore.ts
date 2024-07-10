import { idCreator } from '@/utils';
import { IFormAttributesProps } from '@/types';
import { IFormAttrStore, IBaseStore } from './types';

export default {
  /**
   * 表单属性
   */
  formAttrs: {
    id: idCreator('form'),
    horizontalGap: 8,
    verticalGap: 8,
  },

  setFormAttrs(attrs: IFormAttributesProps) {
    this.formAttrs = attrs;
  },

  setFormAttr(key, value) {
    this.formAttrs[key] = value;
  },
} as Pick<IBaseStore, keyof IFormAttrStore>;

import { IFieldValuesStore, IBaseStore } from './types';

export default {
  /**
   * 表单属性
   */
  fieldValues: {},

  setFieldValue(field: string, value: any) {
    this.fieldValues[field] = value;
  },

  setFieldsValues(values: Record<string, any>) {
    this.fieldValues = values;
  },
} as Pick<IBaseStore, keyof IFieldValuesStore>;

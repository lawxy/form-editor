import { IFieldValuesStore, IBaseStore } from './types';

export default {
  /**
   * 表单属性
   */
  fieldValues: {},

  formInstance: undefined,

  setForm(form) {
    this.formInstance = form;
  },

  setFieldValue(field: string, value: any) {
    this.fieldValues[field] = value;
    this.formInstance?.setFieldValue(field, value);
  },

  setFieldsValues(values: Record<string, any>) {
    this.fieldValues = values;
    this.formInstance?.setFieldsValue(values);
  },
} as Pick<IBaseStore, keyof IFieldValuesStore>;

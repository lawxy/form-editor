import { makeAutoObservable } from 'mobx';
import { idCreator } from '@/utils';
import type { IBaseElement, IFormAttributesProps, TFormSerive } from '../types';
import { IBaseStore } from './types';
import serviceStore from './serviceStore';
import elementStore from './elementStore';

const extendStore = (store: Record<string, any>, _this: any) => {
  Object.entries(store).forEach(([key, value]) => {
    if(typeof value === 'function') {
      _this[key] = value.bind(_this)
    }else {
      _this[key] = value
    }
  })
}

const baseStore: IBaseStore = Object.assign({},
  serviceStore,
  elementStore,
  ) as IBaseStore;

class Store {
  [key: string]: any;

  constructor() {
    extendStore(baseStore, this),
    makeAutoObservable(this);
  }

  getFormJson() {
    return {
      formElements: this.formElements,
      fieldValues: this.fieldValues,
      formAttrs: this.formAttrs,
      formServices: this.formServices
    }
  }

  /**
   * 表单值
  */
  fieldValues: Record<string, any> = {}

  setFieldValue(field: string, value: any) {
    this.fieldValues[field] = value
  }

  setFieldsValues(values: Record<string, any>) {
    this.fieldValues = values;
  }

  /**
   * 属性tab值
  */
  formSettingTab: 'element' | 'form' | 'service' = 'element'

  setFormSettingTab(tab: 'element' | 'form' | 'service') {
    this.formSettingTab = tab
  }

  /**
   * 表单属性
  */
  formAttrs: IFormAttributesProps = {
    isProcessForm: false,
    horizontalGap: 8,
    verticalGap: 8
  }

  setFormAttrs(attrs: IFormAttributesProps) {
    this.formAttrs = attrs
  }

  setFormAttr<T extends keyof IFormAttributesProps>(key: T, value: IFormAttributesProps[T]) {
    this.formAttrs[key] = value;
  }

  /**
   * 校验每个组件的属性字段
  */
  // validateSettringAttr() {
  //   for(let i = 0 ; i < this.formElements.length ; i++) {
  //     const { bindTable, bindField } = this.formElements[i]
  //     if(!bindTable || !bindField) return this.formElements[i]
  //   }
  //   return null
  // }
  /**
   * 事件
  */
}

// @ts-ignore
export default new Store() as IBaseStore;

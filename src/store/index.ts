import { makeAutoObservable } from 'mobx';
import elementStore from './elementStore';
import serviceStore from './serviceStore';
import formAttrStore from './formAttrStore';
import fieldValuesStore from './fieldValuesStore';
import { IBaseStore } from './types';
export * from './tabStore';

const extendStore = (store: Record<string, any>, _this: any) => {
  Object.entries(store).forEach(([key, value]) => {
    if (typeof value === 'function') {
      _this[key] = value.bind(_this);
    } else {
      _this[key] = value;
    }
  });
};

const baseStore: IBaseStore = Object.assign(
  {},
  elementStore,
  serviceStore,
  formAttrStore,
  fieldValuesStore,
) as IBaseStore;

class Store {
  [key: string]: any;

  constructor() {
    /* eslint-disable */
    extendStore(baseStore, this);
    makeAutoObservable(this);
  }

  getSchema() {
    return {
      formElements: this.formElements,
      fieldValues: this.fieldValues,
      formAttrs: this.formAttrs,
      formServices: this.formServices,
    };
  }
}

export default new Store() as IBaseStore;

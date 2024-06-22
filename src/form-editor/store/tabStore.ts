import { makeAutoObservable } from 'mobx';

// formSettingTab: TFormTabType;
// setFormSettingTab: (tab: TFormTabType) => void;

export type TFormTab = 'element' | 'form' | 'service';
export type TElementTab = '';

class TabStore {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 属性tab值
   */
  formTab: TFormTab = 'form';

  setFormTab(tab: TFormTab) {
    this.formTab = tab;
  }

  elementTab: '';

  setElementTab(tab: 'element' | 'form' | 'service') {
    this.formTab = tab;
  }
}

export const tabStore = new TabStore();

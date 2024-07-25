import { makeAutoObservable } from 'mobx';

// formSettingTab: TFormTabType;
// setFormSettingTab: (tab: TFormTabType) => void;

export type TFormTab = 'element' | 'form' | 'service';
export type TElementTab = 'attribute' | 'style' | 'event';

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

  elementTab: TElementTab =  'attribute';

  setElementTab(tab: TElementTab) {
    this.elementTab = tab;
  }

  init() {
    this.setFormTab('element')
    this.setElementTab('attribute')
  }
}

export const tabStore = new TabStore();

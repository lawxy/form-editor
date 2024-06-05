import { makeAutoObservable } from 'mobx';
import { idCreator } from '@/utils';
import type { IBaseElement, IFormAttributesProps } from '../types';
import { arrayMoveImmutable } from 'array-move';
class Store {

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 储存所有元素的map
  */
  elementsMap = new Map();

  /**
   * 表单元素集合
  */
  formElements: IBaseElement[] = [];

  getFormJson() {
    return {
      formElements: this.formElements,
      fieldValues: this.fieldValues,
      formAttrs: this.formAttrs
    }
  }

  setFormElements(els: IBaseElement[]){
    this.formElements = els;
  }

  clearAllElements() {
    this.formElements = [];
  }

  /**
   * 通过id获取元素
  */
  getElFromId(id: string) {
    return this.elementsMap.get(id);
  }

  /**
   * 新增元素
  */
  appendEl(el: IBaseElement) {
    this.formElements.push(el);
    this.setSelectedElement(el);
    this.elementsMap.set(el.id, el);
  }

  /**
   * 插入元素
  */
  insertEl(el: IBaseElement, idx: number) {
    this.formElements.splice(idx, 0, el)
    this.setSelectedElement(el)
    this.elementsMap.set(el.id, el);
  }

  /**
   * 移动元素
  */
  moveEl(fromIndex: number, toIndex: number) {
    this.formElements = arrayMoveImmutable(this.formElements, fromIndex, toIndex)
  }

  /**
   * 删除元素
  */
   deleteEl(el: IBaseElement) {
    const idx = this.formElements.findIndex(item => item.id === el.id)
    this.formElements.splice(idx, 1)
    this.elementsMap.delete(el.id);
  }

  /**
   * 复制元素
  */
  copyEl(el: IBaseElement){
    const idx = this.formElements.findIndex(item => item.id === el.id)
    const newEl:IBaseElement =  { ...el, id: idCreator() }
    this.formElements.splice(idx+1, 0,newEl)
    return newEl
  }

  /**
   * 当前选中的元素
  */
  selectedElement: IBaseElement = {};
  
  setSelectedElement(el: IBaseElement) {
    this.selectedElement = el;
  }

  /**
   * 设置当前元素属性
  */
  setSelectedProp<T extends keyof IBaseElement>(field: T, value: IBaseElement[T]) {
    this.selectedElement[field] = value;
    const elInForm = this.formElements.find((item) => item.id === this.selectedElement.id) as IBaseElement
    elInForm[field] = value;
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
  formSettingTab: 'element' | 'form' = 'element'

  setFormSettingTab(tab: 'element' | 'form') {
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
}




export default new Store();

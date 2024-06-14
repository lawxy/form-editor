import { idCreator } from '@/utils';
import { TFormSerive, TFormSerives } from '@/types';
import { IBaseStore, IServiceStore } from './types'

export default {
  /**
  * 服务
  */
   formServices: [],

  setFormServices(services: TFormSerives) {
    this.formServices = services;
  },
  /**
  * 获取服务
  */
   getFormServices() {
    return this.formServices
   },

   /**
    * 新增服务
   */
   addService(serv: TFormSerive) {
     this.formServices.push(serv)
   },
   /**
    * 删除服务
   */
   deleteService(id: string) {
     const idx = this.formServices!.findIndex(item => item.id === id)
     this.formServices.splice(idx, 1)
   },
   /**
    * 复制服务
   */
   copyService(serv: TFormSerive) {
     const idx = this.formServices!.findIndex(item => item.id === serv.id)
     const newServ:TFormSerive =  { ...serv, name: `${serv.name}-副本`, id: idCreator('service') }
     this.formServices.splice(idx+1, 0, newServ)
   },
   /**
    * 设置服务属性
   */
   setService(id: string, servAttr: Partial<TFormSerive>){
     const idx = this.formServices!.findIndex(item => item.id === id)
     this.formServices[idx] = { ...this.formServices![idx], ...servAttr }
   }
} as Pick<IBaseStore , keyof IServiceStore>;
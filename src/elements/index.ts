export * from './export';

// import { makeAutoObservable } from 'mobx';
// import type { IDragElementProp } from '../types';

// class Store {
//   constructor() {
//     makeAutoObservable(this);
//   }
//   ElementsMap: Record<string, IDragElementProp> = {};

//   initModules = (modules: Record<string, any>) => {
//     let name = '';
//     let current = {} as IDragElementProp;
//     Object.keys(modules).forEach((path: string) => {
//       const currentName = path.split('/')[1];
//       const currentNameUpper = currentName.toLocaleUpperCase();
//       if (!name) {
//         name = currentName;
//       }

//       if (name && currentName !== name) {
//         this.ElementsMap[current.type] = current;
//         current = {} as IDragElementProp;
//         name = currentName;
//       }

//       const module = modules[path];

//       Object.entries(module).forEach(([moduleKey, content]: [string, any]) => {
//         const capitalUpper =
//           currentName[0].toLocaleUpperCase() + currentName.slice(1);
//         if (moduleKey === `ELEMENT_${currentNameUpper}`) {
//           return (current.type = content);
//         }
//         if (moduleKey === `Render${capitalUpper}`) {
//           return (current.render = content);
//         }
//         if (moduleKey === `Setting${capitalUpper}`) {
//           return (current.setting = content);
//         }
//         if (moduleKey === `${currentNameUpper}_TEXT`) {
//           return (current.text = content);
//         }
//         current[moduleKey as keyof IDragElementProp] = content;
//       });
//     });
//   };

//   init() {
//     try {
//       //@ts-ignore
//       const modules = require.context('.', true, /\.tsx?$/);
//       const modulesObj: any = {};
//       modules.keys().forEach((key: string) => {
//         if (key === './index.ts' || key === './export.ts') return;
//         modulesObj[key] = modules(key)?.default || modules(key);
//       });
//       this.initModules(modulesObj);
//     } catch (e) {
//       console.log(e);
//       //@ts-ignore
//       const modules = import.meta.glob('./**/*.{tsx,ts,js}');
//       const modulesObj: any = {};
//       const modulesKeys = Object.keys(modules);

//       const inject = async () => {
//         for (let i = 0; i < modulesKeys.length; i++) {
//           const path = modulesKeys[i];
//           if (
//             path === './index.ts' ||
//             path === './export.ts' ||
//             path === './index.js' ||
//             path === './export.js' ||
//             path.endsWith('.d.js') ||
//             path.endsWith('.d.ts')
//           ) {
//             continue;
//           }
//           const module = await modules[path]();

//           modulesObj[path] = module;
//         }
//         this.initModules(modulesObj);
//       };
//       inject();
//     }
//   }
// }
// export const elementsMapStore = new Store();
// elementsMapStore.init();

import { createPinia } from "pinia";


const pinia = createPinia()


// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/default-store'

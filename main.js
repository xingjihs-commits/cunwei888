/**
 * main.js - 应用入口
 * 用途：初始化Vue应用、注册Pinia状态管理
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// 创建SSR应用实例
export function createApp() {
  const app = createSSRApp(App)

  // 注册Pinia状态管理
  app.use(createPinia())

  return {
    app
  }
}

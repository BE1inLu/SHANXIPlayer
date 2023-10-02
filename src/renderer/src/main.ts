import { createApp } from 'vue'
import App from './App.vue'
import native from 'naive-ui'
import router from './router'
import pinia from './store'


const localApp = createApp(App)

localApp.use(native)
localApp.use(router)
localApp.use(pinia)

localApp.mount('#app')

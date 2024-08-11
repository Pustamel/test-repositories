import '@/app/scss/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/app/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

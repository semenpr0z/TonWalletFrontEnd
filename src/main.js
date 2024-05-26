import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { Buffer } from 'buffer'
window.Buffer = Buffer

import process from 'process'
window.process = process

createApp(App).mount('#app')

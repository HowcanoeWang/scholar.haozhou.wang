import { mount } from 'svelte'
import './app.css'
import 'font-awesome/css/font-awesome.min.css'
import 'academicons/css/academicons.min.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app

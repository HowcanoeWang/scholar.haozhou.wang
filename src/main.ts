import { mount } from 'svelte'
import './app.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'academicons/css/academicons.min.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  // 用于判断是用户根目录xxx.github.io还是子目录xxx.github.io/project-name）
  // 如果你自定义了域名 custom domain, 直接注释掉下面的base行
  base: process.env.VITE_BASE_PATH || '/', 
  plugins: [tailwindcss(), svelte()],
})

<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import daisyuiLogo from './assets/daisyui.svg' // 假设你已将 daisyui.svg 放入 assets 文件夹
  import typescriptLogo from './assets/typescript.svg' // 假设你已将 typescript.svg 放入 assets 文件夹

  import "./app.css"
</script>

<main>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <div class="flex justify-center p-8 space-x-8">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} class="h-24" alt="Vite Logo" />
          </a>
          <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            <img src={svelteLogo} class="h-24" alt="Svelte Logo" />
          </a>
          <a href="https://daisyui.com/" target="_blank" rel="noreferrer">
            <img src={daisyuiLogo} class="h-24" alt="DaisyUI Logo" />
          </a>
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
            <img src={typescriptLogo} class="h-24" alt="TypeScript Logo" />
          </a>
        </div>
        <h1 class="text-2xl font-bold">Vite + Svelte + DaisyUI + TypeScript</h1>
        <p class="py-6">
          这是一个使用 Vite、Svelte、DaisyUI 和 TypeScript 构建的静态起始页面。
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</main>

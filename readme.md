# Vite + Svelte + TypeScript + TailwindCSS + DaisyUI 快速启动模板

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

这是一个现代前端开发模板，集成了 Vite、Svelte、TypeScript、TailwindCSS 和 DaisyUI，并配置了通过 GitHub Actions 实现的自动化部署流程。你只需要将代码推送到 `main` 分支，网站就会自动构建并发布到 GitHub Pages。

---

## 目录

- [Part 1: 我已经基于此模板创建了项目，如何开始编辑？](#part-1-我已经基于此模板创建了项目如何开始编辑)
  - [背景技术栈简介](#背景技术栈简介)
  - [第一步：安装 pnpm](#第一步安装-pnpm)
  - [第二步：设置本地开发环境](#第二步设置本地开发环境)
  - [第三步：启动本地开发服务器](#第三步启动本地开发服务器)
  - [第四步：修改代码并推送](#第四步修改代码并推送)
- [Part 2: 我想使用这个模板来创建一个全新的网站](#part-2-我想使用这个模板来创建一个全新的网站)
  - [第一步：通过模板创建你自己的新仓库](#第一步通过模板创建你自己的新仓库)
  - [第二步：将新仓库克隆到本地](#第二步将新仓库克隆到本地)
  - [第三步：安装开发环境 (pnpm)](#第三步安装开发环境-pnpm)
  - [第四步：配置 GitHub Pages 的部署方式](#第四步配置-github-pages-的部署方式)
  - [工作原理：Push-to-Deploy 自动化流程](#工作原理push-to-deploy-自动化流程)

---

## Part 1: 我已经基于此模板创建了项目，如何开始编辑？

如果你已经通过 `Use this template` 按钮创建了自己的项目，或者被邀请协作一个基于此模板的项目，请遵循以下步骤开始你的开发之旅。

### 背景技术栈简介

- **Vite**: 一个极速的现代前端构建工具，提供了闪电般的本地开发体验。
- **TypeScript**: JavaScript 的超集，为代码添加了静态类型检查，提高了代码的可维护性和健壮性。
- **Svelte**: 一个创新的前端框架，它将你的代码在构建时编译成高效的、命令式的 JavaScript，从而在运行时实现卓越的性能。
- **TailwindCSS**: 一个功能类优先的 CSS 框架，让你无需离开 HTML 就能快速构建自定义设计的界面。
- **DaisyUI**: TailwindCSS 的一个插件，提供了预设的 UI 组件（按钮、卡片等），让你在保持 Tailwind 灵活性的同时，也能快速搭建美观的界面。

### 第一步：安装 pnpm

本项目使用 `pnpm` 作为包管理器，它比 `npm` 或 `yarn` 更快、更节省磁盘空间。

如果你尚未安装 `pnpm`，请打开你的终端（Terminal 或 PowerShell），运行以下命令：

```bash
# 如果你已安装 Node.js (推荐)
npm install -g pnpm
```

更多安装方式，请参考 [pnpm 官方文档](https://pnpm.io/installation)。

### 第二步：设置本地开发环境

首先，克隆（clone）你的项目代码到本地。然后进入项目目录，安装所有依赖项。

```bash
# 1. 克隆你的仓库 (将 URL 替换为你自己的)
git clone https://github.com/YourUsername/Your-Repo-Name.git

# 2. 进入项目目录
cd Your-Repo-Name

# 3. 使用 pnpm 安装依赖
pnpm install
```

`pnpm install` 命令会读取 `pnpm-lock.yaml` 文件，确保你和团队成员安装的依赖版本完全一致。

### 第三步：启动本地开发服务器

安装完依赖后，运行以下命令来启动一个本地开发服务器：

```bash
pnpm dev
```

终端会显示一个本地服务器地址，通常是 `http://localhost:5173/`。在浏览器中打开这个地址，你就能看到正在实时预览的网站了。

**核心优势**：当你修改并保存任何代码文件时（例如 `src/main.ts` 或 `index.html`），浏览器中的页面会自动刷新，无需手动操作。

### 第四步：修改 Svelte 组件并推送

现在你可以自由地修改代码了！

- **页面组件**: 主要的 UI 逻辑在 `src/App.svelte` 文件中。Svelte 文件将 HTML、CSS 和 JavaScript 结合在一个文件中，实现了组件化开发。
- **页面样式**: 你可以在 `.svelte` 文件的 `<style>` 标签中编写组件级 CSS，也可以直接在 HTML 标签上使用 TailwindCSS 的类名，例如 `<h1 class="text-3xl font-bold">`。
- **页面逻辑**: 在 `.svelte` 文件的 `<script lang="ts">` 标签中编写 TypeScript 代码来处理组件的状态和行为。

完成修改后，将你的代码推送到 GitHub 仓库的 `main` 分支：

```bash
# 1. 添加所有修改的文件到暂存区
git add .

# 2. 创建一个提交记录
git commit -m "在这里描述你的修改，例如：更新了首页标题"

# 3. 推送到 GitHub
git push origin main
```

**你不需要在本地运行 `build` 命令！** GitHub Actions 会自动检测到你的推送，然后在云端服务器上为你完成构建、打包和部署的所有工作。几分钟后，你的线上网站就会更新。

---

## Part 2: 我想使用这个模板来创建一个全新的网站

如果你喜欢这个模板，并希望用它来开启一个全新的项目，请遵循以下步骤。

### 第一步：通过模板创建你自己的新仓库

1.  访问本模板的 GitHub 页面。
2.  点击页面右上角的绿色按钮 **`Use this template`**。
3.  选择 **`Create a new repository`**。
4.  为你的新仓库命名，选择是否设为私有，然后点击 **`Create repository`**。

这样，你就拥有了一个和此模板结构完全相同的新仓库，并且它与原模板没有 fork 关系。

> [!Note]
> **关于initial commit失败的说明**
> 
> 通过这个模板创建项目后，Github Actions会自动运行一个`initial commit`的workflow，这个workflow通常会失败，不过不用担心，请继续按照下面第二步的说明配置项目

### 第二步：配置 GitHub Pages 的部署方式

为了让自动化部署生效，你需要进行一个简单的设置：

1.  进入你新创建的 GitHub 仓库页面。
2.  点击右上角的 **`Settings`** (设置)。
3.  在左侧菜单中，选择 **`Pages`**。
4.  在 **`Build and deployment`** (构建和部署) 下的 **`Source`** (源) 部分，选择 **`GitHub Actions`**。    
    这个设置告诉 GitHub，网站的部署将由我们预先配置好的 GitHub Actions 工作流来驱动，而不是通过传统的分支。

> [!WARNING]
> **关于自定义域名 (Custom Domain) 的重要说明**
> 
> 如果你计划为你的 GitHub Pages 网站设置自定义域名，**必须**修改 `vite.config.ts` 文件。请注释掉或删除 `base` 配置行，否则网站部署后资源文件（如 CSS 和 JS）的路径会不正确，导致页面呈现白屏无法正常加载。
>
>  ```ts
>  // vite.config.ts
>  export default defineConfig({
>    // 如果你使用了自定义域名，请注释掉或删除下面这行 'base' 配置
>    base: process.env.VITE_BASE_PATH || '/', 
>    ...
>  })
>  ```

### 第三步：访问初始化页面

为了确认 GitHub Actions 已成功执行并部署了你的网站，请按照以下步骤操作：

1.  进入你的 GitHub 仓库页面，点击顶部的 **`Actions`** 标签。
2.  在左侧菜单中，选择 **`All workflows`**。
3.  找到最近一次运行成功的 `deploy.yml` 工作流（通常会有一个绿色的 ✅ 标记）。
4.  点击进入该工作流的详情页面，在 `deploy` 步骤下，你会找到一个部署成功的网址。
5.  访问该网址，你应该能看到如下所示的初始页面：

如果一切正常，你将看到一个包含 Vite、Svelte、TypeScript、TailwindCSS 和 DaisyUI 标志的欢迎页面。

### 工作原理：Push-to-Deploy 自动化流程

本模板的核心特性是“推送即部署”。其工作原理如下：

1.  **触发**：当你向 `main` 分支推送（`git push`）任何代码时。
2.  **启动工作流**：GitHub Actions 会自动启动定义在 `.github/workflows/deploy.yml` 文件中的工作流。
3.  **构建 (Build Job)**：
    -   在云端虚拟机上检出你的代码。
    -   安装 `pnpm` 和 `Node.js`。
    -   运行 `pnpm install` 安装所有依赖。
    -   运行 `pnpm build`，Vite 会将你的 TypeScript 和 TailwindCSS 代码编译、打包成最终的静态 HTML、CSS 和 JavaScript 文件，并放入 `dist` 目录。
    -   将 `dist` 目录打包成一个 "artifact" (构建工件) 并上传。
4.  **部署 (Deploy Job)**：
    -   等待 `build` 任务成功完成。
    -   从 "artifact" 中下载构建好的静态文件。
    -   将这些文件部署到 GitHub Pages 服务上。
5.  **完成**：你的网站更新成功，可以通过 `https://YourUsername.github.io/Your-New-Repo-Name/` 访问。

整个过程全自动，让你能专注于编码，无需关心繁琐的部署细节。

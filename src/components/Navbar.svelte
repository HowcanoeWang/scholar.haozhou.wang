<script lang="ts">
  import { t, locale } from 'svelte-i18n';
  import { onMount } from 'svelte';

  const languages = [
    { code: 'cn', label: '简体中文' },
    { code: 'en', label: 'English' },
    { code: 'jp', label: '日本語' }
  ];

  let currentLangLabel = $derived(languages.find(l => l.code === $locale)?.label || 'English');

  function switchLanguage(lang: string) {
    locale.set(lang);
    // Update URL param
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }

  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  /* Theme Logic */
  let currentTheme = $state('light');

  onMount(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        }
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
  });

  function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }
</script>

<nav class="bg-base-100/70 backdrop-blur-md sticky top-0 z-50 shadow-lg">
  <div class="navbar w-full max-w-[960px] mx-auto px-4">
  <div class="navbar-start">
    <div class="dropdown">
      <div role="button" tabindex="0" class="btn btn-ghost lg:hidden" onclick={toggleMenu} aria-label="Toggle navigation">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      {#if isMenuOpen}
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="#profile-section">{$t('nav.profile')}</a></li>
          <li><a href="#publication-section">{$t('nav.publication')}</a></li>
          <li><a href="#project-section">{$t('nav.project')}</a></li>
          <li><a href="#timeline-section">{$t('nav.timeline')}</a></li>
          <li><a href="#award-section">{$t('nav.award')}</a></li>
        </ul>
      {/if}
    </div>
    <a class="btn btn-ghost text-xl" href="#profile-section">haozhou.wang</a>
  </div>
  
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1 font-medium text-xl">
      <li><a href="#profile-section">{$t('nav.profile')}</a></li>
      <li><a href="#publication-section">{$t('nav.publication')}</a></li>
      <li><a href="#project-section">{$t('nav.project')}</a></li>
      <li><a href="#timeline-section">{$t('nav.timeline')}</a></li>
      <li><a href="#award-section">{$t('nav.award')}</a></li>
    </ul>
  </div>

  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <div role="button" tabindex="0" class="btn btn-ghost flex items-center gap-2">
        <i class="fas fa-globe text-lg"></i>
        <span class="text-md hidden sm:inline">{currentLangLabel}</span>
      </div>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box mt-4">
        {#each languages as lang}
            <li><button onclick={() => switchLanguage(lang.code)}>{lang.label}</button></li>
        {/each}
      </ul>
    </div>
    
    <!-- Theme Toggle -->
    <button class="btn btn-ghost btn-circle ml-2 p-1" onclick={toggleTheme} aria-label="Toggle Theme">
      {#if currentTheme === 'dark'}
        <!-- Sun Icon (Click to switch to Light) -->
        <img src="/icons/sun.svg" alt="Sun" class="w-6 h-6 invert dark:invert-0" />
      {:else}
        <!-- Moon Icon (Click to switch to Dark) -->
        <img src="/icons/moon.svg" alt="Moon" class="w-6 h-6 invert-0 dark:invert" />
      {/if}
    </button>
  </div>
  </div>
</nav>

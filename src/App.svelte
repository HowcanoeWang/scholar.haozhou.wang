<script lang="ts">
  import { onMount } from 'svelte';
  import { setupI18n } from '$lib/i18n';
  import Navbar from './components/Navbar.svelte';
  import Profile from './components/Profile.svelte';
  import Publications from './components/Publications.svelte';
  import Projects from './components/Projects.svelte';
  import Timeline from './components/Timeline.svelte';
  import Awards from './components/Awards.svelte';
  import Footer from './components/Footer.svelte';
  import { t, isLoading } from 'svelte-i18n';

  let isReady = $state(false);

  onMount(async () => {
      await setupI18n();
      isReady = true;
  });
</script>

{#if isReady}
<main class="min-h-screen bg-background font-sans text-foreground relative selection:bg-foreground selection:text-background">
  <Navbar />

  <!-- Profile Section (Masthead) -->
  <Profile />

  <!-- Publication Section -->
  <div class="bg-background relative">
      <Publications />
  </div>

  <!-- Projects Section -->
  <div class="bg-muted/30 py-24 relative" id="project-section">
      <!-- Decorator Blob -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gray-200/20 dark:bg-gray-800/20 blur-3xl rounded-full mix-blend-multiply dark:mix-blend-overlay filter pointer-events-none blob-shape-1"></div>
      
      <div class="w-full max-w-[960px] mx-auto px-4 relative z-10">
          <div class="text-center mb-16">
              <h3 class="text-4xl font-serif font-bold tracking-tight">{$t('proj.t')}</h3>
              <div class="h-1 w-20 bg-foreground/10 mx-auto mt-4 rounded-full"></div>
          </div>
          <Projects />
      </div>
  </div>

  <!-- Timeline Section -->
  <div class="bg-background py-24 relative" id="timeline-section">
      <div class="w-full max-w-[960px] mx-auto px-4">
          <div class="text-center mb-16">
              <h3 class="text-4xl font-serif font-bold tracking-tight">{$t('time.t')}</h3>
              <div class="h-1 w-20 bg-foreground/10 mx-auto mt-4 rounded-full"></div>
          </div>
          <Timeline />
      </div>
  </div>

  <!-- Awards Section -->
  <div class="bg-muted/30 py-24 relative" id="award-section">
      <!-- Decorator Blob -->
       <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gray-200/20 dark:bg-gray-800/20 blur-3xl rounded-full mix-blend-multiply dark:mix-blend-overlay filter pointer-events-none blob-shape-2"></div>

      <div class="w-full max-w-[960px] mx-auto px-4 relative z-10">
          <div class="text-center mb-16">
              <h3 class="text-4xl font-serif font-bold tracking-tight">{$t('awd.t')}</h3>
              <div class="h-1 w-20 bg-foreground/10 mx-auto mt-4 rounded-full"></div>
          </div>
          <Awards />
      </div>
  </div>

  <Footer />
</main>
{:else}
    <div class="flex h-screen w-full items-center justify-center">
        <span class="loading loading-spinner loading-lg"></span>
    </div>
{/if}

<style>
  /* Global font adjustments if needed, though Tailwind sans is usually fine */
  :global(html) {
      scroll-behavior: smooth;
  }
</style>

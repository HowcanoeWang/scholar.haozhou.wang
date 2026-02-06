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
<main class="min-h-screen bg-base-50 font-sans text-base-content relative selection:bg-primary selection:text-primary-content">
  <Navbar />

  <!-- Profile Section (Masthead) -->
  <Profile />

  <!-- Publication Section -->
  <Publications />

  <!-- Projects Section -->
  <div class="bg-base-100 py-16" id="project-section">
      <div class="w-full max-w-[960px] mx-auto px-4">
          <div class="text-center mb-12">
              <h3 class="text-3xl font-bold">{$t('proj.t')}</h3>
          </div>
          <Projects />
      </div>
  </div>

  <!-- Timeline Section -->
  <div class="bg-white py-16" id="timeline-section">
      <div class="w-full max-w-[960px] mx-auto px-4">
          <div class="text-center mb-12">
              <h3 class="text-3xl font-bold">{$t('time.t')}</h3>
          </div>
          <Timeline />
      </div>
  </div>

  <!-- Awards Section -->
  <div class="bg-base-100 py-16" id="award-section">
      <div class="w-full max-w-[960px] mx-auto px-4">
          <div class="text-center mb-12">
              <h3 class="text-3xl font-bold">{$t('awd.t')}</h3>
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

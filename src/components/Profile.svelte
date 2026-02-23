<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from 'svelte-i18n';
    import { fetchScholarData, type ScholarData } from '$lib/services/scholarService';
    import CitationChart from './CitationChart.svelte';
    import Intro from './Intro.svelte';
    import { cdnAsset } from '$lib/constants/cdn';

    let scholarData = $state<ScholarData | null>(null);

    onMount(async () => {
        scholarData = await fetchScholarData();
    });

</script>

<div class="bg-background text-foreground py-20 relative overflow-hidden" id="profile-section">
    <!-- Background Decorator -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-muted/30 rounded-full blur-3xl -z-10 pointer-events-none blob-shape-3 mix-blend-multiply dark:mix-blend-overlay"></div>

    <div class="w-full max-w-[960px] mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row gap-16 items-start">
            <!-- Profile Card -->
            <div class="lg:w-1/3 flex flex-col items-center text-center w-full">
                <div class="relative group">
                    <div class="absolute inset-0 bg-muted rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                        src={cdnAsset('/files/imgs/header.jpg')} 
                        alt="Haozhou Wang" 
                        class="relative rounded-full w-48 h-48 object-cover mb-8 border-4 border-background shadow-xl z-10"
                    />
                </div>

                <h1 class="text-4xl font-serif font-bold mb-2 tracking-tight">
                    {@html $t('prof.name')}
                </h1>
                <p class="text-xl mb-2 text-muted-foreground font-light">
                    {@html $t('prof.position')}
                </p>
                <a href="https://lab.fieldphenomics.com/" target="_blank" class="text-sm italic text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground mb-8">
                    {$t('prof.labname')}
                </a>

                <div class="w-full max-w-sm flex flex-col items-center gap-6">
                    <a class="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-full font-bold uppercase tracking-wider hover:scale-105 hover:shadow-lg transition-all duration-300" 
                       href={cdnAsset('/files/cv.pdf')} 
                       target="_blank">
                        <i class="fas fa-file-pdf mr-2"></i> {$t('prof.cv_down')}
                    </a>

                    <a href="https://scholar.google.com/citations?user=CnTTa3EAAAAJ" target="_blank" class="block w-full hover:opacity-80 group">
                        <div class="flex justify-center gap-6 text-sm">
                            <div class="flex flex-col items-center">
                                <span class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{$t('prof.cite')}</span>
                                <span class="text-2xl font-serif font-bold group-hover:scale-110 transition-transform">
                                    {scholarData?.table[0].citations.all || '???'}
                                </span>
                            </div>
                            <div class="w-px bg-border h-10"></div>
                            <div class="flex flex-col items-center">
                                <span class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{$t('prof.hidx')}</span>
                                <span class="text-2xl font-serif font-bold group-hover:scale-110 transition-transform">
                                    {scholarData?.table[1].h_index.all || '???'}
                                </span>
                            </div>
                        </div>
                    </a>

                    <!-- Chart -->
                    <div class="w-full opacity-80 hover:opacity-100 transition-opacity">
                         <CitationChart data={scholarData} />
                    </div>

                    <!-- Social Icons -->
                    <div class="flex justify-center gap-3 mt-4 flex-wrap">
                        <button class="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 hover:bg-foreground hover:text-background transition-all duration-300" aria-label="Email" onclick={() => (document.getElementById('email_modal') as HTMLDialogElement).showModal()}>
                            <i class="fa fa-envelope fa-lg"></i>
                        </button>
                        <a href="https://github.com/HowcanoeWang" target="_blank" aria-label="GitHub" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 hover:bg-foreground hover:text-background transition-all duration-300">
                            <i class="fa-brands fa-github fa-lg"></i>
                        </a>
                        <a href="https://www.researchgate.net/profile/Haozhou_Wang" target="_blank" aria-label="ResearchGate" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 hover:bg-foreground hover:text-background transition-all duration-300">
                            <i class="ai ai-researchgate fa-lg"></i>
                        </a>
                        <a href="https://scholar.google.com/citations?user=CnTTa3EAAAAJ" target="_blank" aria-label="Google Scholar" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 hover:bg-foreground hover:text-background transition-all duration-300">
                            <i class="ai ai-google-scholar fa-lg"></i>
                        </a>
                        <a href="https://orcid.org/0000-0001-6135-402X" target="_blank" aria-label="ORCID" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 hover:bg-foreground hover:text-background transition-all duration-300">
                             <i class="ai ai-orcid fa-lg"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Profile Info -->
            <div class="lg:w-2/3 pt-4">
                <Intro />
            </div>
        </div>
    </div>

    <!-- Email Modal -->
    <dialog id="email_modal" class="modal text-foreground backdrop:backdrop-blur-sm">
      <div class="modal-box bg-card text-card-foreground rounded-3xl shadow-2xl border border-border p-8">
        <h3 class="font-serif font-bold text-2xl mb-4">{$t('prof.mailto')}</h3>
        <p class="text-lg py-4 font-mono bg-muted/30 p-4 rounded-xl text-center select-all">haozhou-wang [at] outlook.com</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="px-6 py-2 rounded-full border border-border hover:bg-muted transition-colors font-bold uppercase text-xs tracking-wider">{$t('prof.close')}</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
</div>

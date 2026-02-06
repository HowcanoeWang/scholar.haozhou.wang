<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from 'svelte-i18n';
    import { fetchScholarData, type ScholarData } from '$lib/services/scholarService';
    import CitationChart from './CitationChart.svelte';
    import Intro from './Intro.svelte';

    let scholarData = $state<ScholarData | null>(null);

    onMount(async () => {
        scholarData = await fetchScholarData();
    });

</script>

<div class="bg-gray-800 text-white py-12" id="profile-section">
    <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12">
            <!-- Profile Card -->
            <div class="lg:w-1/3 flex flex-col items-center text-center">
                <img 
                    src="https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/imgs/header.jpg" 
                    alt="Haozhou Wang" 
                    class="rounded-full w-40 h-40 object-cover mb-6 border-4 border-gray-700 shadow-lg"
                />

                <h1 class="text-3xl font-bold mb-1">
                    {$t('prof.name')}
                </h1>
                <p class="text-xl mb-1 text-gray-300">
                    {$t('prof.position')}
                </p>
                <a href="https://lab.fieldphenomics.com/" target="_blank" class="italic hover:text-blue-300 transition-colors">
                    {$t('prof.labname')}
                </a>

                <div class="mt-8 w-full max-w-sm">
                    <a class="btn btn-sm btn-light w-full mb-4 bg-white text-gray-800 hover:bg-gray-200 border-none" 
                       href="https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/cv.pdf" 
                       target="_blank">
                        <i class="fas fa-file-pdf mr-2"></i> {$t('prof.cv_down')}
                    </a>

                    <a href="https://scholar.google.com/citations?user=CnTTa3EAAAAJ" target="_blank" class="block mb-4 hover:opacity-80">
                        <div class="flex justify-center gap-4 text-sm">
                            <div>
                                {$t('prof.cite')}
                                <span class="badge badge-neutral bg-gray-600 text-white border-0 ml-1">
                                    {scholarData?.table[0].citations.all || '???'}
                                </span>
                            </div>
                            <div>
                                {$t('prof.hidx')}
                                <span class="badge badge-neutral bg-gray-600 text-white border-0 ml-1">
                                    {scholarData?.table[1].h_index.all || '???'}
                                </span>
                            </div>
                        </div>
                    </a>

                    <!-- Chart -->
                    <CitationChart data={scholarData} />

                    <!-- Social Icons -->
                    <div class="flex justify-center gap-4 mt-6">
                        <button class="btn btn-ghost btn-circle btn-sm text-white" aria-label="Email" onclick={() => (document.getElementById('email_modal') as HTMLDialogElement).showModal()}>
                            <i class="fa fa-envelope fa-lg"></i>
                        </button>
                        <a href="https://github.com/HowcanoeWang" target="_blank" aria-label="GitHub" class="btn btn-ghost btn-circle btn-sm text-white">
                            <i class="fa-brands fa-github fa-lg"></i>
                        </a>
                        <a href="https://www.researchgate.net/profile/Haozhou_Wang" target="_blank" aria-label="ResearchGate" class="btn btn-ghost btn-circle btn-sm text-white">
                            <i class="ai ai-researchgate ai-lg"></i>
                        </a>
                        <a href="https://scholar.google.com/citations?user=CnTTa3EAAAAJ" target="_blank" aria-label="Google Scholar" class="btn btn-ghost btn-circle btn-sm text-white">
                            <i class="ai ai-google-scholar ai-lg"></i>
                        </a>
                        <a href="https://orcid.org/0000-0001-6135-402X" target="_blank" aria-label="ORCID" class="btn btn-ghost btn-circle btn-sm text-white">
                             <i class="ai ai-orcid ai-lg"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Profile Info -->
            <div class="lg:w-2/3">
                <Intro />
            </div>
        </div>
    </div>

    <!-- Email Modal -->
    <dialog id="email_modal" class="modal text-black">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{$t('prof.mailto')}</h3>
        <p class="py-4">haozhou-wang [at] outlook.com</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">{$t('prof.close')}</button>
          </form>
        </div>
      </div>
    </dialog>
</div>

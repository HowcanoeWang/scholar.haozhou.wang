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
    <div class="w-full max-w-[960px] mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12">
            <!-- Profile Card -->
            <div class="lg:w-1/3 flex flex-col items-center text-center">
                <img 
                    src="https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/imgs/header.jpg" 
                    alt="Haozhou Wang" 
                    class="rounded-full w-40 h-40 object-cover mb-6 border-4 border-gray-600 shadow-lg"
                />

                <h1 class="text-3xl font-bold mb-1">
                    {@html $t('prof.name')}
                </h1>
                <p class="text-xl mb-1 text-gray-300">
                    {@html $t('prof.position')}
                </p>
                <a href="https://lab.fieldphenomics.com/" target="_blank" class="italic hover:text-blue-300 transition-colors">
                    {$t('prof.labname')}
                </a>

                <div class="mt-8 w-full max-w-sm flex flex-col items-center">
                    <a class="btn btn-sm bg-white text-gray-900 hover:bg-white-200 border-none px-6 mb-6" 
                       href="https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/cv.pdf" 
                       target="_blank">
                        <i class="fas fa-file-pdf mr-2"></i> {$t('prof.cv_down')}
                    </a>

                    <a href="https://scholar.google.com/citations?user=CnTTa3EAAAAJ" target="_blank" class="block mb-6 hover:opacity-80">
                        <div class="flex justify-center gap-4 text-sm">
                            <div class="flex items-center">
                                {$t('prof.cite')}
                                <span class="badge bg-white text-black border-none ml-2">
                                    {scholarData?.table[0].citations.all || '???'}
                                </span>
                            </div>
                            <div class="flex items-center">
                                {$t('prof.hidx')}
                                <span class="badge bg-white text-black border-none ml-2">
                                    {scholarData?.table[1].h_index.all || '???'}
                                </span>
                            </div>
                        </div>
                    </a>

                    <!-- Chart -->
                    <div class="w-full">
                         <CitationChart data={scholarData} />
                    </div>

                    <!-- Social Icons -->
                    <div class="flex justify-center gap-4 mt-6">
                        <button class="btn btn-ghost btn-circle text-white text-xl" aria-label="Email" onclick={() => (document.getElementById('email_modal') as HTMLDialogElement).showModal()}>
                            <i class="fa fa-envelope"></i>
                        </button>
                        <a href="https://github.com/HowcanoeWang" target="_blank" aria-label="GitHub" class="btn btn-ghost btn-circle text-white text-xl">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="https://www.researchgate.net/profile/Haozhou_Wang" target="_blank" aria-label="ResearchGate" class="btn btn-ghost btn-circle text-white text-xl">
                            <i class="ai ai-researchgate"></i>
                        </a>
                        <a href="https://scholar.google.com/citations?user=CnTTa3EAAAAJ" target="_blank" aria-label="Google Scholar" class="btn btn-ghost btn-circle text-white text-xl">
                            <i class="ai ai-google-scholar"></i>
                        </a>
                        <a href="https://orcid.org/0000-0001-6135-402X" target="_blank" aria-label="ORCID" class="btn btn-ghost btn-circle text-white text-xl">
                             <i class="ai ai-orcid"></i>
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

<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from 'svelte-i18n';
    import { fetchBibTeX, type BibJson, type BibEntry, normalizeTitle } from '$lib/services/bibtexService';
    import { fetchScholarData, type ScholarData } from '$lib/services/scholarService';
    import { customLinks } from '$lib/data/customLinks';
    import { awardi18n } from '$lib/data/awards';
    import Featured from './Featured.svelte';

    let bibData = $state<BibJson | null>(null);
    let scholarData = $state<ScholarData | null>(null);
    let activeTab = $state<'paper' | 'conference' | 'thesis' | 'others'>('paper');

    onMount(async () => {
        const [bib, scholar] = await Promise.all([
            fetchBibTeX(),
            fetchScholarData()
        ]);
        bibData = bib;
        scholarData = scholar;
    });

    let entries = $derived(Object.values(bibData?.entries || {}));

    let papers = $derived(entries.filter((e: BibEntry) => e.bib_type === 'article').sort(sortByDateDesc));
    let conferences = $derived(entries.filter((e: BibEntry) => e.bib_type === 'report').sort(sortByDateDesc));
    let theses = $derived(entries.filter((e: BibEntry) => e.bib_type === 'thesis').sort(sortByDateDesc));

    function sortByDateDesc(a: BibEntry, b: BibEntry) {
        const dateA = a.fields.date || '';
        const dateB = b.fields.date || '';
        return dateB.localeCompare(dateA); 
    }

    function groupByYear(list: BibEntry[]) {
        const groups: Record<string, BibEntry[]> = {};
        list.forEach(entry => {
            const date = entry.fields.date;
            const year = date ? (date.match(/\d{4}/)?.[0] || 'Unknown') : 'Unknown';
            if (!groups[year]) groups[year] = [];
            groups[year].push(entry);
        });
        return Object.entries(groups).sort((a,b)=> Number(b[0])-Number(a[0]));
    }

    let papersByYear = $derived(groupByYear(papers));
    let confByYear = $derived(groupByYear(conferences));

    function getCiteCount(title: string) {
        if (!scholarData) return null;
        const normTitle = normalizeTitle(title);
        const article = scholarData.articles.find(a => normalizeTitle(a.title) === normTitle);
        return article ? article.cited_by : null;
    }

    function getFormatAuthors(authors: any[]) {
        if (!Array.isArray(authors)) return '';
        return authors.map(a => {
            const family = a.family?.[0]?.text || '';
            const given = a.given?.[0]?.text || '';
            const name = `${family}, ${given.split(' ').map((n:string) => n[0]).join('.')}.`;
            return name.includes('Wang, H.') ? `<b>${name}</b>` : name;
        }).join(', ');
    }
</script>

<div class="container mx-auto px-4 py-8" id="publication-section">
    <div class="text-center mb-10">
        <h3 class="text-3xl font-bold mb-2">
            {$t('pub.t')}
        </h3>
    </div>

    <!-- Featured Section -->
    <div class="mb-16">
        <h3 class="text-xl font-bold text-center text-gray-500 uppercase tracking-wider mb-8">
            {$t('pub.subt1')}
        </h3>
        <Featured />
    </div>

    <!-- All Contributions -->
    <div class="text-center mb-8">
        <h3 class="text-xl font-bold text-gray-500 uppercase tracking-wider mb-2">
            {$t('pub.subt2')}
        </h3>
        <p class="md:hidden text-sm text-gray-400">{$t('pub.note')}</p>
    </div>

    <!-- Tabs -->
    <div role="tablist" class="tabs tabs-bordered justify-center mb-8">
        <button role="tab" class="tab tab-lg {activeTab === 'paper' ? 'tab-active font-bold' : ''}" onclick={() => activeTab = 'paper'}>
            {$t('pub.tabs.p')} 
            <span class="badge badge-neutral ml-2">{papers.length}</span>
        </button>
        <button role="tab" class="tab tab-lg {activeTab === 'conference' ? 'tab-active font-bold' : ''}" onclick={() => activeTab = 'conference'}>
            {$t('pub.tabs.c')}
            <span class="badge badge-neutral ml-2">{conferences.length}</span>
        </button>
        <button role="tab" class="tab tab-lg {activeTab === 'thesis' ? 'tab-active font-bold' : ''}" onclick={() => activeTab = 'thesis'}>
            {$t('pub.tabs.t')}
            <span class="badge badge-neutral ml-2">3</span>
        </button>
        <button role="tab" class="tab tab-lg {activeTab === 'others' ? 'tab-active font-bold' : ''}" onclick={() => activeTab = 'others'}>
            {$t('pub.tabs.o')}
        </button>
    </div>

    <!-- Tab Content -->
    <div class="max-w-4xl mx-auto">
        {#if activeTab === 'paper'}
            {#each papersByYear as [year, group]}
                <h3 class="text-2xl font-bold mt-8 mb-4 border-b pb-2">{year}</h3>
                <div class="space-y-6">
                    {#each group as entry}
                        <div class="pl-4 border-l-4 border-gray-200 hover:border-blue-500 transition-colors">
                            <div class="text-base text-gray-800 dark:text-gray-200">
                                {@html getFormatAuthors(entry.fields.author)}
                                <span class="text-gray-500 font-bold mx-1">{entry.fields.date?.match(/\d{4}/)?.[0]}</span>.
                                <span class="font-medium">{entry.fields.title?.[0]?.text}.</span>
                                <span class="font-bold">{entry.fields.journaltitle?.[0]?.text}</span>
                                {entry.fields.volume?.[0]?.text}.
                                <!-- Cite Count -->
                                {#if getCiteCount(entry.fields.title?.[0]?.text)}
                                    <span class="badge badge-secondary ml-2" title={$t('prof.cite')}>
                                        {getCiteCount(entry.fields.title?.[0]?.text)}
                                    </span>
                                {/if}
                            </div>
                            
                            <!-- Award -->
                            {#if awardi18n[entry.entry_key]}
                                <div class="text-sm text-yellow-600 mt-1 font-semibold">
                                    <i class="fas fa-trophy mr-1"></i> {$t(awardi18n[entry.entry_key])}
                                </div>
                            {/if}

                            <!-- Buttons -->
                            <div class="mt-2 space-x-2">
                                {#if entry.fields.doi}
                                    <a href="https://doi.org/{entry.fields.doi}" target="_blank" class="btn btn-xs btn-outline">DOI</a>
                                {/if}
                                {#if customLinks[entry.entry_key]}
                                    {#each Object.entries(customLinks[entry.entry_key]) as [label, url]}
                                        <a href={url} target="_blank" class="btn btn-xs btn-outline">{label}</a>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {/each}

        {:else if activeTab === 'conference'}
            {#each confByYear as [year, group]}
                <h3 class="text-2xl font-bold mt-8 mb-4 border-b pb-2">{year}</h3>
                <div class="space-y-6">
                    {#each group as entry}
                        <div class="pl-4 border-l-4 border-gray-200 hover:border-green-500 transition-colors">
                            <div class="text-base text-gray-800 dark:text-gray-200">
                                {@html getFormatAuthors(entry.fields.author)}
                                <span class="text-gray-500 font-bold mx-1">{entry.fields.date}</span>.
                                <span class="font-medium">{entry.fields.title?.[0]?.text}.</span>
                                <span class="font-bold">{entry.fields.institution?.[0]?.[0]?.text || ''}</span>
                                {entry.fields.location?.[0]?.[0]?.text ? `, ${entry.fields.location[0][0].text}` : ''}.
                            </div>
                            
                            <div class="mt-2 space-x-2">
                                {#if customLinks[entry.entry_key]}
                                    {#each Object.entries(customLinks[entry.entry_key]) as [label, url]}
                                        <a href={url} target="_blank" class="btn btn-xs btn-outline">{label}</a>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {/each}

        {:else if activeTab === 'thesis'}
            <div class="space-y-8 mt-4">
                {#each [{key: 'phd', year: '2023', degree: 'PhD thesis', inst: 'The University of Tokyo', doi: '10.13140/RG.2.2.11525.12009', pdf: 'https://github.com/HowcanoeWang/DoctorThesis/releases', code: 'https://github.com/HowcanoeWang/DoctorThesis', ppt: 'https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/thesis/23_thesis_ppt.pdf'}, 
                        {key: 'msc', year: '2019', degree: 'MSc Forestry thesis', inst: 'The University of New Brunswick', doi: '10.13140/RG.2.2.35680.64004', pdf: 'https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/thesis/19_thesis.pdf', code: 'https://github.com/HowcanoeWang/Spherical2TreeAttributes', ppt: 'https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/thesis/19_thesis_ppt.pdf'},
                        {key: 'bsc', year: '2017', degree: 'BSc Ecology thesis', inst: 'The Nanjing University of Forestry', doi: '10.13140/RG.2.2.30588.77440', pdf: 'https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/thesis/17_thesis.pdf', code: 'https://github.com/HowcanoeWang/ImageDBH', ppt: 'https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/thesis/17_thesis_ppt.pdf'}] as thesis}
                <div>
                   <h3 class="text-xl font-bold mb-2">{$t(`time.${thesis.key}.title`)}</h3>
                   <hr class="mb-2"/>
                   <div class="csl-entry dark:text-gray-200">
                      <b>Wang, H.</b>, <b><span class="text-gray-500">{thesis.year}</span></b>. 
                       Studies... ({thesis.degree}). {thesis.inst}.
                   </div>
                   <div class="mt-2 space-x-2">
                       <a class="btn btn-xs btn-outline" href={`https://doi.org/${thesis.doi}`} target="_blank">DOI</a>
                       <a class="btn btn-xs btn-outline" href={thesis.pdf} target="_blank">PDF</a>
                       {#if thesis.ppt}<a class="btn btn-xs btn-outline" href={thesis.ppt} target="_blank">PPT</a>{/if}
                       {#if thesis.code}<a class="btn btn-xs btn-outline" href={thesis.code} target="_blank">Codes</a>{/if}
                   </div>
                </div>
                {/each}
            </div>

        {:else if activeTab === 'others'}
             <div class="space-y-8 mt-4">
                 <div>
                    <h3 class="text-xl font-bold mb-2">{$t('pub.tabs.bc')}</h3>
                    <hr class="mb-2"/>
                    <div class="dark:text-gray-200">
                        <b>Wang, H.</b>, Guo, W., <b><span class="text-gray-500">2024</span></b>. EasyIDP V2.0...
                    </div>
                    <div class="mt-2 space-x-2">
                        <a class="btn btn-xs btn-outline" href="https://doi.org/10.1007/978-981-97-7762-4_7" target="_blank">DOI</a>
                        <a class="btn btn-xs btn-outline" href="https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/files/books/24_easyidp_v2.pdf" target="_blank">PDF</a>
                    </div>
                 </div>
             </div>
        {/if}
    </div>
</div>

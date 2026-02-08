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
    let books = $derived(entries.filter((e: BibEntry) => e.bib_type === 'incollection').sort(sortByDateDesc));
    let patents = $derived(entries.filter((e: BibEntry) => e.bib_type === 'patent').sort(sortByDateDesc));
    let softwares = $derived(entries.filter((e: BibEntry) => e.bib_type === 'misc').sort(sortByDateDesc));

    function sortByDateDesc(a: BibEntry, b: BibEntry) {
        const dateA = a.fields.date || '';
        const dateB = b.fields.date || '';
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
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
        
        // Sort entries within each year by author name (A-Z)
        Object.keys(groups).forEach(year => {
            groups[year].sort((a, b) => {
                const authorA = getFormatAuthors(a.fields.author).replace(/<[^>]*>/g, '');
                const authorB = getFormatAuthors(b.fields.author).replace(/<[^>]*>/g, '');
                return authorA.localeCompare(authorB);
            });
        });

        return Object.entries(groups).sort((a,b)=> Number(b[0])-Number(a[0]));
    }

    let papersByYear = $derived(groupByYear(papers));
    let confByYear = $derived(groupByYear(conferences));

    function getCiteCount(title: string) {
        if (!scholarData) return null;
        const normTitle = normalizeTitle(title);
        if (!normTitle) return null;
        
        // More robust matching: partial match to handle truncations
        const article = scholarData.articles.find(a => {
            const normA = normalizeTitle(a.title);
            if (!normA) return false;
            return normA.includes(normTitle) || normTitle.includes(normA);
        });
        return article ? article.cited_by : null;
    }

    function getText(field: any): string {
        if (!field) return '';
        if (typeof field === 'string') return field;
        if (Array.isArray(field)) {
            return field.map(getText).join('');
        }
        if (typeof field === 'object' && 'text' in field) {
            return field.text;
        }
        if (typeof field === 'number') return field.toString();
        return '';
    }

    function getFormatAuthors(authors: any[]) {
        if (!Array.isArray(authors)) return '';
        return authors.map(a => {
            const family = getText(a.family);
            const given = getText(a.given);
            const name = `${family}, ${given.split(' ').map((n:string) => n[0]).join('.')}.`;
            return name.includes('Wang, H') ? `<b>${name}</b>` : name;
        }).join(', ');
    }
</script>

<div class="w-full max-w-[960px] mx-auto px-4 py-8" id="publication-section">
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
            <span class="badge badge-neutral ml-2">{theses.length}</span>
        </button>
        <button role="tab" class="tab tab-lg {activeTab === 'others' ? 'tab-active font-bold' : ''}" onclick={() => activeTab = 'others'}>
            {$t('pub.tabs.o')}
            <span class="badge badge-neutral ml-2">{books.length + patents.length + softwares.length}</span>
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
                            <div class="text-base text-base-content/80 dark:text-gray-200">
                                {@html getFormatAuthors(entry.fields.author)}
                                <span class="text-gray-500 font-bold mx-1">{entry.fields.date?.match(/\d{4}/)?.[0]}</span>.
                                <span class="font-medium">{getText(entry.fields.title)}.</span>
                                <span class="font-bold">{getText(entry.fields.journaltitle)}</span>
                                {getText(entry.fields.volume)}{#if getText(entry.fields.pages)}, {getText(entry.fields.pages)}{/if}.
                                <!-- Cite Count -->
                                {#if getCiteCount(getText(entry.fields.title))}
                                    <span class="badge badge-secondary ml-2" title={$t('prof.cite')}>
                                        {getCiteCount(getText(entry.fields.title))}
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
                                <span class="font-medium">{getText(entry.fields.title)}.</span>
                                <span class="font-bold">{getText(entry.fields.institution)}</span>
                                {getText(entry.fields.location) ? `, ${getText(entry.fields.location)}` : ''}.
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
            <div class="space-y-6 mt-8">
                {#each theses as thesis}
                    <h3 class="text-2xl font-bold border-b pb-2">{$t(`time.${thesis.entry_key.split('_').pop() === '2023' ? 'phd' : thesis.entry_key.split('_').pop() === '2019' ? 'msc' : 'bsc'}.title`)}</h3>
                    <div class="pl-4 border-l-4 border-gray-200 hover:border-blue-500 transition-colors">
                        <div class="text-base text-gray-800 dark:text-gray-200">
                            <b>Wang, H.</b>, <b><span class="text-gray-500">{thesis.fields.date?.match(/\d{4}/)?.[0]}</span></b>. 
                            {getText(thesis.fields.title)}. (<b>{getText(thesis.fields.type)}</b>). {getText(thesis.fields.institution)}.
                        </div>
                        
                        <div class="mt-2 space-x-2">
                            {#if thesis.fields.doi}
                                <a href="https://doi.org/{thesis.fields.doi}" target="_blank" class="btn btn-xs btn-outline">DOI</a>
                            {/if}
                            {#if thesis.fields.url}
                                <a href={getText(thesis.fields.url)} target="_blank" class="btn btn-xs btn-outline">URL</a>
                            {/if}
                            {#if customLinks[thesis.entry_key]}
                                {#each Object.entries(customLinks[thesis.entry_key]) as [label, url]}
                                    <a href={url} target="_blank" class="btn btn-xs btn-outline">{label}</a>
                                {/each}
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>

        {:else if activeTab === 'others'}
             <div class="space-y-8 mt-4">
                 {#if books.length > 0}
                 <div>
                    <h3 class="text-2xl font-bold mt-8 mb-4 border-b pb-2">{$t('pub.tabs.bc')}</h3>
                    <div class="space-y-6">
                        {#each books as entry}
                        <div class="dark:text-gray-200 pl-4 border-l-4 border-gray-200 hover:border-blue-500 transition-colors">
                            <div class="mb-2">
                                {@html getFormatAuthors(entry.fields.author)}
                                <b><span class="text-gray-500">{entry.fields.date?.match(/\d{4}/)?.[0]}</span></b>. 
                                {getText(entry.fields.title)}, in: {getText(entry.fields.editor)} (Eds.), {getText(entry.fields.booktitle)}. {getText(entry.fields.publisher)}, {getText(entry.fields.location)}, pp. {getText(entry.fields.pages)}.
                            </div>
                            <div class="space-x-2">
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
                 </div>
                 {/if}

                 {#if patents.length > 0}
                 <div>
                    <h3 class="text-2xl font-bold mt-8 mb-4 border-b pb-2">{$t('pub.tabs.pa')}</h3>
                    <div class="space-y-6">
                        {#each patents as entry}
                        <div class="dark:text-gray-200 pl-4 border-l-4 border-gray-200 hover:border-blue-500 transition-colors">
                            <div class="mb-2">
                                {@html getFormatAuthors(entry.fields.author)}
                                {getText(entry.fields.title)}: <b><span class="text-gray-500">{entry.fields.date?.match(/\d{4}/)?.[0]}</span></b>. {getText(entry.fields.number)}
                            </div>
                            <div class="space-x-2">
                                {#if entry.fields.url}
                                    <a href={getText(entry.fields.url)} target="_blank" class="btn btn-xs btn-outline">URL</a>
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
                 </div>
                 {/if}

                 {#if softwares.length > 0}
                 <div>
                    <h3 class="text-2xl font-bold mt-8 mb-4 border-b pb-2">{$t('pub.tabs.s')}</h3>
                    <div class="space-y-6">
                        {#each softwares as entry}
                        <div class="pl-4 border-l-4 border-gray-200 hover:border-blue-500 transition-colors">
                            <div class="dark:text-gray-200 mb-2">
                                {getText(entry.fields.title)} [{getText(entry.fields.shorttitle)}] {getText(entry.fields.version)}, <b><span class="text-gray-500">{entry.fields.date?.match(/\d{4}/)?.[0]}</span></b>. {getText(entry.fields.number)}.
                            </div>
                            <div class="space-x-2">
                                {#if entry.fields.url}
                                    <a href={getText(entry.fields.url)} target="_blank" class="btn btn-xs btn-outline">URL</a>
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
                 </div>
                 {/if}
             </div>
        {/if}
    </div>
</div>

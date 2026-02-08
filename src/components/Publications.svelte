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

<div class="w-full max-w-[960px] mx-auto px-4 py-16 relative z-10" id="publication-section">
    <div class="text-center mb-16">
        <h3 class="text-4xl font-serif font-bold tracking-tight mb-4">
            {$t('pub.t')}
        </h3>
        <div class="h-1 w-20 bg-foreground/10 mx-auto rounded-full"></div>
    </div>

    <!-- Featured Section -->
    <div class="mb-24">
        <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center mb-10 flex items-center justify-center gap-4">
            <span class="h-px w-8 bg-border"></span>
            {$t('pub.subt1')}
            <span class="h-px w-8 bg-border"></span>
        </h3>
        <Featured />
    </div>

    <!-- All Contributions -->
    <div class="text-center mb-10">
        <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
            {$t('pub.subt2')}
        </h3>
        <p class="md:hidden text-xs text-muted-foreground/70">{$t('pub.note')}</p>
    </div>

    <!-- Tabs -->
    <div role="tablist" class="flex flex-wrap justify-center gap-2 mb-12">
        <button role="tab" class="px-6 py-2 rounded-full border border-transparent transition-all duration-300 text-lg font-serif {activeTab === 'paper' ? 'bg-foreground text-background shadow-lg' : 'hover:bg-muted text-muted-foreground'}" onclick={() => activeTab = 'paper'}>
            {$t('pub.tabs.p')} 
            <span class="ml-2 text-sm opacity-70 font-sans">{papers.length}</span>
        </button>
        <button role="tab" class="px-6 py-2 rounded-full border border-transparent transition-all duration-300 text-lg font-serif {activeTab === 'conference' ? 'bg-foreground text-background shadow-lg' : 'hover:bg-muted text-muted-foreground'}" onclick={() => activeTab = 'conference'}>
            {$t('pub.tabs.c')}
            <span class="ml-2 text-sm opacity-70 font-sans">{conferences.length}</span>
        </button>
        <button role="tab" class="px-6 py-2 rounded-full border border-transparent transition-all duration-300 text-lg font-serif {activeTab === 'thesis' ? 'bg-foreground text-background shadow-lg' : 'hover:bg-muted text-muted-foreground'}" onclick={() => activeTab = 'thesis'}>
            {$t('pub.tabs.t')}
            <span class="ml-2 text-sm opacity-70 font-sans">{theses.length}</span>
        </button>
        <button role="tab" class="px-6 py-2 rounded-full border border-transparent transition-all duration-300 text-lg font-serif {activeTab === 'others' ? 'bg-foreground text-background shadow-lg' : 'hover:bg-muted text-muted-foreground'}" onclick={() => activeTab = 'others'}>
            {$t('pub.tabs.o')}
            <span class="ml-2 text-sm opacity-70 font-sans">{books.length + patents.length + softwares.length}</span>
        </button>
    </div>

    <!-- Tab Content -->
    <div class="max-w-4xl mx-auto">
        {#if activeTab === 'paper'}
            {#each papersByYear as [year, group]}
                <div class="relative pl-8 pb-12 last:pb-0 border-l border-border/50 ml-6">
                    <span class="absolute -left-[1.35rem] top-0 bg-background border border-border text-muted-foreground font-serif font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-sm z-10 text-sm">
                        {year}
                    </span>
                    <div class="space-y-8 pt-1">
                        {#each group as entry}
                            <div class="group relative pl-6 transition-all duration-300">
                                <span class="absolute left-0 top-[1.1rem] w-1.5 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors"></span>
                                <div class="text-base text-foreground/90 leading-relaxed">
                                    {@html getFormatAuthors(entry.fields.author)}
                                    <span class="text-muted-foreground mx-1">{entry.fields.date?.match(/\d{4}/)?.[0]}</span>.
                                    <span class="font-bold">{getText(entry.fields.title)}.</span>
                                    <span class="italic text-muted-foreground">{getText(entry.fields.journaltitle)}</span>
                                    {getText(entry.fields.volume)}{#if getText(entry.fields.pages)}, {getText(entry.fields.pages)}{/if}.
                                    <!-- Cite Count -->
                                    {#if getCiteCount(getText(entry.fields.title))}
                                        <span class="inline-flex items-center justify-center px-2 py-0.5 ml-1 text-[10px] font-bold text-background bg-foreground rounded-full align-middle" title={$t('prof.cite')}>
                                            {getCiteCount(getText(entry.fields.title))}
                                        </span>
                                    {/if}
                                </div>
                                
                                <!-- Award -->
                                {#if awardi18n[entry.entry_key]}
                                    <div class="text-sm text-foreground mt-2 font-medium flex items-center gap-2">
                                        <i class="fas fa-trophy text-xs"></i> {$t(awardi18n[entry.entry_key])}
                                    </div>
                                {/if}

                                <!-- Buttons -->
                                <div class="mt-3 flex flex-wrap gap-2 opacity-100 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity duration-300">
                                    {#if entry.fields.doi}
                                        <a href="https://doi.org/{entry.fields.doi}" target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">DOI</a>
                                    {/if}
                                    {#if customLinks[entry.entry_key]}
                                        {#each Object.entries(customLinks[entry.entry_key]) as [label, url]}
                                             <a href={url} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">{label}</a>
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}

        {:else if activeTab === 'conference'}
            {#each confByYear as [year, group]}
                <div class="relative pl-8 pb-12 last:pb-0 border-l border-border/50 ml-6">
                    <span class="absolute -left-[1.35rem] top-0 bg-background border border-border text-muted-foreground font-serif font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-sm z-10 text-sm">
                        {year}
                    </span>
                    <div class="space-y-6 pt-1">
                        {#each group as entry}
                            <div class="group relative pl-6 transition-all duration-300">
                                <span class="absolute left-0 top-[1.1rem] w-1.5 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors"></span>
                                <div class="text-base text-foreground/90 leading-relaxed">
                                    {@html getFormatAuthors(entry.fields.author)}
                                    <span class="text-muted-foreground mx-1">{entry.fields.date}</span>.
                                    <span class="font-bold">{getText(entry.fields.title)}.</span>
                                    <span class="italic text-muted-foreground">{getText(entry.fields.institution)}</span>
                                    {getText(entry.fields.location) ? `, ${getText(entry.fields.location)}` : ''}.
                                </div>
                                
                                <div class="mt-3 flex flex-wrap gap-2 opacity-100 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity duration-300">
                                    {#if customLinks[entry.entry_key]}
                                        {#each Object.entries(customLinks[entry.entry_key]) as [label, url]}
                                            <a href={url} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">{label}</a>
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}

        {:else if activeTab === 'thesis'}
            <div class="space-y-12 mt-8">
                {#each theses as thesis}
                    <div>
                        <h3 class="text-2xl font-serif font-bold mb-6 pb-2 border-b border-border/50">
                            {$t(`time.${thesis.entry_key.split('_').pop() === '2023' ? 'phd' : thesis.entry_key.split('_').pop() === '2019' ? 'msc' : 'bsc'}.title`)}
                        </h3>
                        <div class="space-y-6">
                            <div class="group relative pl-6 transition-all duration-300">
                                <span class="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors"></span>
                                <div class="text-base text-foreground/90 leading-relaxed">
                                    <b>Wang, H.</b>, <b><span class="text-muted-foreground">{thesis.fields.date?.match(/\d{4}/)?.[0]}</span></b>. 
                                    {getText(thesis.fields.title)}. (<b>{getText(thesis.fields.type)}</b>). {getText(thesis.fields.institution)}.
                                </div>
                                
                                <div class="mt-3 flex flex-wrap gap-2">
                                    {#if thesis.fields.doi}
                                        <a href="https://doi.org/{thesis.fields.doi}" target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">DOI</a>
                                    {/if}
                                    {#if thesis.fields.url}
                                        <a href={getText(thesis.fields.url)} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">URL</a>
                                    {/if}
                                    {#if customLinks[thesis.entry_key]}
                                        {#each Object.entries(customLinks[thesis.entry_key]) as [label, url]}
                                            <a href={url} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">{label}</a>
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

        {:else if activeTab === 'others'}
             <div class="space-y-16 mt-8">
                 {#if books.length > 0}
                 <div>
                    <h3 class="text-2xl font-serif font-bold mb-6 pb-2 border-b border-border/50">{$t('pub.tabs.bc')}</h3>
                    <div class="space-y-6">
                        {#each books as entry}
                        <div class="group relative pl-6 transition-all duration-300">
                            <span class="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors"></span>
                            <div class="mb-2 text-foreground/90 leading-relaxed">
                                {@html getFormatAuthors(entry.fields.author)}
                                <b><span class="text-muted-foreground">{entry.fields.date?.match(/\d{4}/)?.[0]}</span></b>. 
                                {getText(entry.fields.title)}, in: {getText(entry.fields.editor)} (Eds.), {getText(entry.fields.booktitle)}. {getText(entry.fields.publisher)}, {getText(entry.fields.location)}, pp. {getText(entry.fields.pages)}.
                            </div>
                            <div class="flex gap-2">
                                {#if entry.fields.doi}
                                    <a href="https://doi.org/{entry.fields.doi}" target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">DOI</a>
                                {/if}
                                {#if customLinks[entry.entry_key]}
                                    {#each Object.entries(customLinks[entry.entry_key]) as [label, url]}
                                        <a href={url} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">{label}</a>
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
                    <h3 class="text-2xl font-serif font-bold mb-6 pb-2 border-b border-border/50">{$t('pub.tabs.pa')}</h3>
                    <div class="space-y-6">
                        {#each patents as entry}
                        <div class="group relative pl-6 transition-all duration-300">
                            <span class="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors"></span>
                            <div class="mb-2 text-foreground/90 leading-relaxed">
                                {@html getFormatAuthors(entry.fields.author)}
                                {getText(entry.fields.title)}: <b><span class="text-muted-foreground">{entry.fields.date?.match(/\d{4}/)?.[0]}</span></b>. {getText(entry.fields.number)}
                            </div>
                            <div class="flex gap-2">
                                {#if entry.fields.url}
                                    <a href={getText(entry.fields.url)} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">URL</a>
                                {/if}
                                {#if customLinks[entry.entry_key]}
                                    {#each Object.entries(customLinks[entry.entry_key]) as [label, url]}
                                        <a href={url} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">{label}</a>
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
                    <h3 class="text-2xl font-serif font-bold mb-6 pb-2 border-b border-border/50">{$t('pub.tabs.s')}</h3>
                    <div class="space-y-6">
                        {#each softwares as entry}
                        <div class="group relative pl-6 transition-all duration-300">
                            <span class="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors"></span>
                            <div class="text-foreground/90 mb-2 leading-relaxed">
                                {getText(entry.fields.title)} [{getText(entry.fields.shorttitle)}] {getText(entry.fields.version)}, <b><span class="text-muted-foreground">{entry.fields.date?.match(/\d{4}/)?.[0]}</span></b>. {getText(entry.fields.number)}.
                            </div>
                            <div class="flex gap-2">
                                {#if entry.fields.url}
                                    <a href={getText(entry.fields.url)} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">URL</a>
                                {/if}
                                {#if customLinks[entry.entry_key]}
                                    {#each Object.entries(customLinks[entry.entry_key]) as [label, url]}
                                        <a href={url} target="_blank" class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">{label}</a>
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

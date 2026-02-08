<script lang="ts">
    import { t } from 'svelte-i18n';
    import { awards } from '$lib/data/awards';
    import { onMount, onDestroy } from 'svelte';

    let numCols = $state(1);
    let width = $state(0);

    function updateCols() {
        width = window.innerWidth;
        if (width < 640) {
            numCols = 1;
        } else if (width < 768) {
            numCols = 2;
        } else {
            numCols = 3;
        }
    }

    onMount(() => {
        updateCols();
        window.addEventListener('resize', updateCols);
    });

    onDestroy(() => {
        window.removeEventListener('resize', updateCols);
    });

    // Distribute awards into columns
    let cols = $derived.by(() => {
        const columns: typeof awards[] = Array.from({ length: numCols }, () => []);
        awards.forEach((award, i) => {
            columns[i % numCols].push(award);
        });
        return columns;
    });
</script>

<div class="flex flex-row items-start gap-8">
    {#each cols as col}
        <div class="flex flex-col gap-8 flex-1 w-full min-w-0">
            {#each col as award}
                <div class="bg-card text-card-foreground rounded-3xl border border-border p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full">
                    <figure class="mb-6 rounded-2xl overflow-hidden">
                        <img src={award.img} alt="Award" class="w-full h-auto object-cover rounded-xl" />
                    </figure>
                    <div class="text-center">
                        <h2 class="text-lg font-bold font-serif leading-snug mb-4">
                            {$t(award.titleKey)}
                        </h2>
                        <div class="flex flex-col gap-3">
                            <div class="flex justify-center gap-2 flex-wrap">
                                {#each award.links as link}
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" 
                                       class="inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors">
                                        {link.label}
                                    </a>
                                {/each}
                            </div>
                            <div class="text-xs font-mono text-muted-foreground pt-3 border-t border-border/50">
                                {award.date}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/each}
</div>

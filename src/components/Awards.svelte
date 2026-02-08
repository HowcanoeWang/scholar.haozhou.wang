<script lang="ts">
    import { t } from 'svelte-i18n';
    import { awards } from '$lib/data/awards';
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {#each awards as award}
        <div class="group bg-card text-card-foreground rounded-3xl border border-border p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <figure class="h-32 flex items-center justify-center p-4 mb-4 bg-muted/30 rounded-2xl overflow-hidden group-hover:bg-muted/50 transition-colors">
                <img src={award.img} alt="Award" class="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
            </figure>
            <div class="text-center">
                <h2 class="text-lg font-bold font-serif leading-snug mb-4 min-h-[3.5rem] flex items-center justify-center">
                    {$t(award.titleKey)}
                </h2>
                <div class="flex flex-col gap-3">
                    <div class="flex justify-center gap-2">
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

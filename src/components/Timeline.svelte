<script lang="ts">
    import { timeline } from '$lib/data/timeline';
    import { t } from 'svelte-i18n';
</script>

<div class="space-y-10">
    {#each timeline as item}
        <div class="flex flex-col sm:flex-row group">
            <!-- Time Column -->
            <div class="sm:w-3/12 pb-6 sm:pb-0 sm:pr-10 sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-border/50 pl-6 sm:pl-0 flex flex-col justify-center relative">
                <!-- Dot indicator for mobile -->
                <span class="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-border sm:hidden group-hover:bg-foreground transition-colors"></span>
                <!-- Dot indicator for desktop -->
                <span class="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border hidden sm:block group-hover:bg-foreground transition-colors"></span>

                <!-- Desktop View -->
                <div class="hidden sm:block font-serif text-xl italic text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {@html item.period.replace('|', '<br>|<br>')}
                </div>
                <!-- Mobile View -->
                <div class="sm:hidden font-serif text-lg italic text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.periodSm}
                </div>
            </div>

            <!-- Content Column -->
            <div class="sm:w-9/12 pl-6 sm:pl-12 pt-1">
                <h4 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    {$t(item.institutionKey)}
                </h4>
                <h5 class="text-xl font-serif font-bold text-foreground mb-3 leading-tight">
                    {$t(item.titleKey)}
                </h5>
                <p class="text-sm leading-relaxed text-muted-foreground/80">
                    {$t(item.descKey)}
                </p>
            </div>
        </div>
    {/each}
</div>

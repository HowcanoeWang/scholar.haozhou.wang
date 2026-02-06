<script lang="ts">
    import { timeline } from '$lib/data/timeline';
    import { t } from 'svelte-i18n';
</script>

<div class="space-y-8">
    {#each timeline as item}
        <div class="flex flex-col sm:flex-row">
            <!-- Time Column -->
            <div class="sm:w-3/12 pb-4 sm:pb-0 sm:pr-8 sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-gray-300 dark:border-gray-700 pl-4 sm:pl-0 flex flex-col justify-center">
                <!-- Desktop View -->
                <div class="hidden sm:block font-serif text-xl italic text-gray-600 dark:text-gray-400">
                    {@html item.period.replace('|', '<br>|<br>')}
                </div>
                <!-- Mobile View -->
                <div class="sm:hidden font-serif text-lg italic text-gray-600 dark:text-gray-400">
                    {item.periodSm}
                </div>
            </div>

            <!-- Content Column -->
            <div class="sm:w-9/12 pl-4 sm:pl-12">
                <h4 class="text-lg uppercase tracking-widest font-light mb-1">
                    {$t(item.institutionKey)}
                </h4>
                <h5 class="text-base font-serif italic text-gray-600 dark:text-gray-400 mb-2">
                    {$t(item.titleKey)}
                </h5>
                <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {$t(item.descKey)}
                </p>
            </div>
        </div>
    {/each}
</div>

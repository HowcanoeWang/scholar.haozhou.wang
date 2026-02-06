<script lang="ts">
    import { t } from 'svelte-i18n';
    
    // Define awards data locally since it's small, or move to data file if it grows
    const awards = [
        {
            img: "./files/awards/24_cigr.png",
            titleKey: "awd.cigr24",
            date: "2024.05",
            links: [
                { label: "Web", url: "https://www.jsidre.or.jp/the-6th-cigr-international-conference-2024/" }
            ]
        }
    ];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each awards as award}
        <div class="card bg-base-100 shadow-sm border border-base-200">
            <figure class="px-4 pt-4">
                <img src={award.img} alt="Award" class="rounded-xl object-contain max-h-48" />
            </figure>
            <div class="card-body items-center text-center p-4">
                <h2 class="card-title text-base font-bold">
                    {$t(award.titleKey)}
                </h2>
                <div class="flex justify-between items-center w-full mt-2">
                    <div class="btn-group">
                        {#each award.links as link}
                            <a href={link.url} target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-outline">
                                {link.label}
                            </a>
                        {/each}
                    </div>
                    <span class="text-xs text-gray-400">{award.date}</span>
                </div>
            </div>
        </div>
    {/each}
</div>

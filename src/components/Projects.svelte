<script lang="ts">
    import { projects } from '$lib/data/projects';
    import { t } from 'svelte-i18n';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each projects as project}
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure class="h-48 overflow-hidden bg-white/10 dark:bg-white/5">
                <!-- Use object-contain or cover based on original look. Original was card-img-top -->
                <img src={project.img} alt={project.title} class="w-full h-full object-contain p-4" />
            </figure>
            <div class="card-body">
                <div class="text-sm font-bold text-gray-500 uppercase tracking-wide">
                    {$t(project.institution)}
                </div>
                <h2 class="card-title mt-0">
                    {project.title}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                    {$t(project.descriptionKey)}
                </p>
                <div class="card-actions justify-between items-end mt-4">
                    <div class="space-x-2">
                        {#each project.links as link}
                            <a href={link.url} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                                {link.label}
                            </a>
                        {/each}
                    </div>
                    <span class="text-xs text-gray-400 font-mono">{project.date}</span>
                </div>
            </div>
        </div>
    {/each}
</div>

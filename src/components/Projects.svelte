<script lang="ts">
    import { projects } from '$lib/data/projects';
    import { t } from 'svelte-i18n';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each projects as project}
        <div class="group relative bg-card text-card-foreground rounded-[2rem] border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <!-- Image Container with organic mask possibly, but keeping it simple rounded for now to match card -->
            <figure class="h-56 overflow-hidden bg-muted/50 relative">
                <div class="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img 
                    src={project.img} 
                    alt={project.title} 
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
            </figure>
            
            <div class="p-8">
                <div class="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    {$t(project.institution)}
                </div>
                <h2 class="text-2xl font-serif font-bold mb-3 leading-tight">
                    {project.title}
                </h2>
                <p class="text-muted-foreground text-sm leading-relaxed mb-6">
                    {$t(project.descriptionKey)}
                </p>
                
                <div class="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-border/50">
                    <div class="flex gap-2 flex-wrap">
                        {#each project.links as link}
                            <a href={link.url} target="_blank" rel="noopener noreferrer" 
                               class="inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">
                                {link.label}
                            </a>
                        {/each}
                    </div>
                    <span class="text-xs font-mono text-muted-foreground/70">{project.date}</span>
                </div>
            </div>
        </div>
    {/each}
</div>

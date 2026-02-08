<script lang="ts">
    import { t } from 'svelte-i18n';
</script>

<div class="pt-3">
    <!-- Intro -->
    <p class="text-xl mt-3 mb-0" >
        {$t('prof.intro')}
    </p>

    <!-- Research Interests -->
    <h3 class="text-xl mt-8 mb-4 font-bold font-serif text-foreground">
        {$t('prof.int.t')}
    </h3>
    <ul class="space-y-2 text-foreground/90 font-light">
        <li class="flex items-start gap-2">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0"></span>
            <span>{$t('prof.int.l1')}</span>
        </li>
        <li class="flex items-start gap-2">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0"></span>
            <span>{$t('prof.int.l2')}</span>
        </li>
        <li class="flex items-start gap-2">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0"></span>
            <span>{$t('prof.int.l3')}</span>
        </li>
        <li class="flex items-start gap-2">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0"></span>
            <span>{$t('prof.int.l4')}</span>
        </li>
    </ul>

    <!-- Education -->
    <h3 class="text-xl mt-8 mb-4 font-bold font-serif text-foreground">
        {$t('prof.edu.t')}
    </h3>
    <ul class="space-y-4 font-light">
        <li class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span class="text-foreground/90">{$t('prof.edu.l1')}</span> 
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-muted text-muted-foreground">2023.09</span>
        </li>
        <li class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span class="text-foreground/90">{$t('prof.edu.l2')}</span> 
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-muted text-muted-foreground">2019.12</span>
        </li>
        <li class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span class="text-foreground/90">{$t('prof.edu.l3')}</span> 
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-muted text-muted-foreground">2017.06</span>
        </li>
    </ul>

    <!-- Skills -->
    <h3 class="text-xl mt-8 mb-4 font-bold font-serif text-foreground">
        {$t('prof.skills.t')}
    </h3>
    <div class="space-y-4 font-light">
        <div class="flex flex-col gap-1">
            <span class="font-bold text-foreground">Python</span>
            <span class="text-sm text-muted-foreground">{$t('prof.skills.python')}</span>
        </div>
        <div class="flex flex-col gap-1">
            <span class="font-bold text-foreground">{$t('prof.skills.web.t')}</span>
            <span class="text-sm text-muted-foreground">{$t('prof.skills.web.l')}</span>
        </div>
        <div class="flex flex-col gap-1">
            <span class="font-bold text-foreground">{$t('prof.skills.plugin.t')}</span>
            <span class="text-sm text-muted-foreground">{$t('prof.skills.plugin.l')}</span>
        </div>
        <div class="flex flex-col gap-1">
            <span class="font-bold text-foreground">{$t('prof.skills.others.t')}</span>
            <span class="text-sm text-muted-foreground">{$t('prof.skills.others.l')}</span>
        </div>
    </div>
</div>

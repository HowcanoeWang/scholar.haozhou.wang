<script lang="ts">
    import { t } from 'svelte-i18n';
</script>

<div class="pt-3">
    <!-- Intro -->
    <p class="text-xl mt-3 mb-0" >
        {$t('prof.intro')}
    </p>

    <!-- Research Interests -->
    <p class="text-xl mt-5 mb-0 font-bold">
        {$t('prof.int.t')}
    </p>
    <ul class="text-lg list-disc ml-5 mt-2 mb-0 font-light">
        <li>{$t('prof.int.l1')}</li>
        <li>{$t('prof.int.l2')}</li>
        <li>{$t('prof.int.l3')}</li>
        <li>{$t('prof.int.l4')}</li>
    </ul>

    <!-- Education -->
    <p class="text-xl mt-5 mb-0 font-bold">
        {$t('prof.edu.t')}
    </p>
    <ul class="mt-2 mb-0 font-light space-y-2">
        <li>
            <span>{$t('prof.edu.l1')}</span> 
            <span class="badge bg-white text-black border-none ml-2">2023.09</span>
        </li>
        <li>
            <span>{$t('prof.edu.l2')}</span> 
            <span class="badge bg-white text-black border-none ml-2">2019.12</span>
        </li>
        <li>
            <span>{$t('prof.edu.l3')}</span> 
            <span class="badge bg-white text-black border-none ml-2">2017.06</span>
        </li>
    </ul>
</div>

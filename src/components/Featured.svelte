<script lang="ts">
   import { t } from 'svelte-i18n';
   import { fetchScholarData, type ScholarData } from '$lib/services/scholarService';
   import { onMount } from 'svelte';
   import { normalizeTitle } from '$lib/services/bibtexService';

   let scholarData = $state<ScholarData | null>(null);

   onMount(async () => {
       scholarData = await fetchScholarData();
   });

   function getCiteCount(title: string) {
       if (!scholarData) return '??';
       const normTitle = normalizeTitle(title);
       const article = scholarData.articles.find((a: any) => normalizeTitle(a.title) === normTitle); // Using any for a if types are loose or explicit Author type if available
       // Better: ScholarArticle type is exported from service
       return article ? article.cited_by : '0';
   }
   
   // Hardcoded featured list from original index.html
   const featured = [
       {
           img: "/files/imgs/cover_3dpotatotwin.png",
           title: "3DPotatoTwin: a Paired Potato Tuber Dataset for 3D Multi-Sensory Fusion",
           journal: "Plant Phenomics",
           badge: "pub.if.pp", // i18n key or text
           links: [
               { label: "DOI", url: "https://doi.org/10.1016/j.plaphe.2025.100123" },
               { label: "PDF", url: "https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/public/files/paper/25_pp_3dpotatotwin.pdf" },
               { label: "東大ニュース", url: "https://www.a.u-tokyo.ac.jp/topics/topics_20251028-1.html" },
               { label: "日本日経新聞", url: "https://www.nikkei.com/nkd/company/article/?DisplayType=11&ng=DGXZRSP698560_U5A021C2000000&scode=6326" }
           ]
       },
       {
           img: "/files/imgs/cover_broccoli.png",
           title: "Drone-Based Harvest Data Prediction Can Reduce On-Farm Food Loss and Improve Farmer Income",
           journal: "Plant Phenomics",
           badge: "pub.if.pp",
           links: [
               { label: "DOI", url: "https://doi.org/10.34133/plantphenomics.0086" },
               { label: "PDF", url: "https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/public/files/paper/23_pp.pdf" },
               { label: "新京报", url: "https://www.bjnews.com.cn/detail/1698978347129712.html" },
               { label: "EurekAlert!", url: "https://www.eurekalert.org/news-releases/1003639" },
               { label: "日本日経新聞", url: "https://www.nikkei.com/article/DGXZRSP661800_Y3A900C2000000/" }
           ]
       },
       {
           img: "https://github.com/UTokyo-FieldPhenomics-Lab/EasyIDP/raw/v2.0/docs/_static/images/header_v2.0.png",
           title: "EasyIDP: a Python package for intermediate data processing in UAV-based plant phenotyping",
           journal: "Remote Sensing",
           badge: "pub.if.rs", 
           links: [
               { label: "DOI", url: "https://doi.org/10.3390/rs13132622" },
               { label: "PDF", url: "https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/public/files/paper/21_easyidp.pdf" }
           ]
       },
       {
           img: "/files/imgs/19_afm_graph.svg",
           title: "Landscape-level vegetation classification and fractional woody and herbaceous vegetation cover estimation over the dryland ecosystems by unmanned aerial vehicle platform",
           journal: "Agricultural and Forest Meteorology",
           badge: "pub.if.afm",
           links: [
               { label: "DOI", url: "https://doi.org/10.1016/j.agrformet.2019.107665" },
               { label: "PDF", url: "https://cdn.jsdelivr.net/gh/HowcanoeWang/scholar.haozhou.wang/public/files/paper/19_afm.pdf" },
               { label: "News", url: "https://mp.weixin.qq.com/s/7icns8uY78pEonHESMmuTg" }
           ]
       }
   ];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
    {#each featured as item}
        <div class="group relative bg-card text-card-foreground rounded-[2rem] border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
             <figure class="h-56 relative bg-muted/30">
                 <div class="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                 <img 
                    src={item.img} 
                    alt={item.title} 
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                 />
             </figure>
             <div class="p-8">
                 <h2 class="text-xl font-serif font-bold leading-tight mb-3">
                     {item.title}
                     {#if getCiteCount(item.title) !== '0' && getCiteCount(item.title) !== '??'}
                         <div class="inline-flex items-center justify-center px-2 py-0.5 ml-2 text-xs font-bold text-background bg-foreground rounded-full align-middle" title={$t('prof.cite')}>
                             {getCiteCount(item.title)}
                         </div>
                     {/if}
                 </h2>
                 <p class="text-sm text-muted-foreground mb-6">
                     <span class="font-semibold text-foreground">{item.journal}</span> <br>
                     <span class="mt-1 py-0.5 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">{$t(item.badge)}</span>
                 </p>
                 <div class="flex flex-wrap gap-2 mt-auto">
                     {#each item.links as link}
                         <a href={link.url} target="_blank" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300">{link.label}</a>
                     {/each}
                 </div>
             </div>
        </div>
    {/each}
</div>

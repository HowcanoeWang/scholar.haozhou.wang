import { cdnAsset } from '$lib/constants/cdn';

export const customLinks: Record<string, Record<string, string>> = {
    ////////////
    // papers //
    ////////////

    // 2025
    'zhang_grapecpnet_2025':{
        "PDF": cdnAsset('/files/paper/25_compag3.pdf')
    },
    'liu_improved_2025': {
        "PDF": "https://www.mdpi.com/2072-4292/17/5/906/pdf?version=1741184643"
    },
    "li_pointsupervised_2025": {
        "PDF": cdnAsset('/files/paper/25_compag2.pdf')
    },
    'blok_highthroughput_2025': {
        "PDF": cdnAsset('/files/paper/25_compag.pdf')
    },
    'zhou_global_2025': {
        "PDF": cdnAsset('/files/paper/25_pp_riceseg.pdf'),
        "東大ニュース": "https://www.a.u-tokyo.ac.jp/topics/topics_20250916-1.html"
    },
    'wang_global_2025': {
        "PDF": cdnAsset('/files/paper/25_pp_gwfss.pdf')
    },
    'wang_3dpotatotwin_2025': {
        "PDF": cdnAsset('/files/paper/25_pp_3dpotatotwin.pdf'),
        "東大ニュース": "https://www.a.u-tokyo.ac.jp/topics/topics_20251028-1.html",
        "日本日経新聞": "https://www.nikkei.com/nkd/company/article/?DisplayType=11&ng=DGXZRSP698560_U5A021C2000000&scode=6326"
    },

    // 2024
    "zhang_uavbased_2024": {
        "PDF": cdnAsset('/files/paper/24_rs.pdf')
    },

    // 2023
    "wang_dronebased_2023": {
        "PDF": cdnAsset('/files/paper/23_pp.pdf'),
        "新京报": "https://www.bjnews.com.cn/detail/1698978347129712.html",
        "EurekAlert!": "https://www.eurekalert.org/news-releases/1003639",
        "日本日経新聞": "https://www.nikkei.com/article/DGXZRSP661800_Y3A900C2000000/"
    },
    "drofova_use_2023": {
        "PDF": cdnAsset('/files/paper/23_beei.pdf')
    },
    "zhang_tree_2023": {
        "PDF": cdnAsset('/files/paper/23_drones.pdf'),
        "News": "https://www.a.u-tokyo.ac.jp/topics/topics_20210601-1.html"
    },

    // 2021
    "zhao_efficient_2021": {
        "PDF": cdnAsset('/files/paper/21_rs.pdf')
    },
    "dai_sector_2021": {
        "PDF": cdnAsset('/files/paper/21_cjfr_dai.pdf')
    },
    "hsu_sampling_2021": {
        "PDF": cdnAsset('/files/paper/21_cjfr_hsu.pdf')
    },
    "wang_easyidp_2021": {
        "PDF": cdnAsset('/files/paper/21_easyidp.pdf')
    },
    "feldman_easydcp_2021": {
        "PDF": cdnAsset('/files/paper/21_easydcp.pdf'),
        "News": "https://sj.jst.go.jp/news/202109/n0902-03k.html",
        "東大ニュース": "https://www.a.u-tokyo.ac.jp/topics/topics_20210615-1.html"
    },
    "dai_biomass_2021": {
        "PDF": cdnAsset('/files/paper/21_forestry.pdf'),
    },
    "wang_estimating_2021": {
        "PDF": cdnAsset('/files/paper/21_mcfns.pdf')
    },
    "wang_integrated_2020": {
        "PDF": cdnAsset('/files/paper/20_mcfns.pdf')
    },

    // 2019
    "wang_landscape_2019": {
        "PDF": cdnAsset('/files/paper/19_afm.pdf'),
        "News": "https://mp.weixin.qq.com/s/7icns8uY78pEonHESMmuTg"
    },
    "han_vegetation_2018": {
        "PDF": cdnAsset('/files/paper/18_acta.pdf')
    },

    /////////////////
    // conferences //
    /////////////////

    // 2025
    "wang_staggcp_2025jsai": {
        "Abstract": cdnAsset('/files/conf/25_jsai_abstract.pdf'),
        "Oral": cdnAsset('/files/conf/25_jsai_ppt.pdf')
    },
    "wang_camera_2025mlcas": {
        "Abstract": cdnAsset('/files/conf/25_mlcas2025_abstract.pdf'),
        "Oral": cdnAsset('/files/conf/25_mlcas2025_ppt.pdf')
    },

    // 2024
    "wang_dronebased_2024apfita": {
        "Abstract": cdnAsset('/files/conf/24_apfita_abstract.pdf'),
        "Oral": cdnAsset('/files/conf/24_apfita_ppt.pdf')
    },
    'wang_3dpotatotwin_2024cigr': {
        "Abstract": cdnAsset('/files/conf/24_cigr_abstract.pdf'),
        "Poster": cdnAsset('/files/conf/24_cigr_poster.pdf')
    },

    // 2023
    "wang_virtual_2023ihrc": {
        "Abstract": cdnAsset('/files/conf/23_ihrc_abstract.pdf'),
        "Poster": cdnAsset('/files/conf/23_ihrc_ppt.pdf')
    },
    "wang_virtual_2023mlcas": {
        "Abstract": cdnAsset('/files/conf/23_mlcas2023_abstract.pdf'),
        "Poster": cdnAsset('/files/conf/23_mlcas2023_ppt.pdf')
    },

    // 2022
    "wang_estimate_2022ipps": {
        "Abstract": cdnAsset('/files/conf/22_IPPS_abstract.pdf'),
        "Poster": cdnAsset('/files/conf/22_IPPS_poster.pdf')
    },
    "wang_procedural_2022jsai": {
        "Abstract": cdnAsset('/files/conf/22_jsai_abstract.pdf'),
        "Oral": cdnAsset('/files/conf/22_jsai_ppt.pdf')
    },

    // 2021
    "wang_cost-efficient_2021ihrc": {
        "Abstract": cdnAsset('/files/conf/21_IHC_abstract.pdf'),
        "Poster": cdnAsset('/files/conf/21_IHC_poster.pdf'),
        "URL": "https://www.confrxiv.com/IHRC2021/poster-detail-personal.php?id=312"
    },
    "wang_easyidp_2021tdps": {
        "Poster": cdnAsset('/files/conf/21_cfy_poster.pdf'),
        "URL": "https://www.tdps.jp/tdps001#h.bqdgffvi239x"
    },
    "wang_easyidp_2021jsai": {
        "Poster": cdnAsset('/files/conf/21_jsai_poster.pdf')
    },

    // 2020
    "feldman_affordable_2020tcc": {
        "Poster": cdnAsset('/files/conf/20_phenome_poster.pdf')
    },

    // 2019
    "feldman_affordable_2019ipps": {
        "Poster": cdnAsset('/files/conf/19_IPPS_poster.pdf')
    },
    "wang_estimating_2019wmam": {
        "Abstract": cdnAsset('/files/conf/19_WFCA_abstract.pdf'),
        "Oral": cdnAsset('/files/conf/19_WFCA_ppt.pdf'),
        "Poster": cdnAsset('/files/conf/19_WFCA_poster.pdf')
    },

    // 2018
    "wang_measuring_2018grc": {
        "Abstract": cdnAsset('/files/conf/18_GSA_abstract.pdf'),
        "Oral": cdnAsset('/files/conf/18_GSA_ppt.pdf')
    },

    // 2017
    "wang_extracting_2017nmam": {
        "Abstract": cdnAsset('/files/conf/17_NEMO_abstact.pdf'),
        "Oral": cdnAsset('/files/conf/17_NEMO_ppt.pdf')
    },
    "wang_uavhirap_2017intecol": {
        "Abstract": cdnAsset('/files/conf/17_ICE_abstract.pdf'),
        "Oral": cdnAsset('/files/conf/17_ICE_ppt.pdf')
    },

    ////////////
    // Thesis //
    ////////////
    "wang_studies_2023": {
        "PDF": "https://github.com/HowcanoeWang/DoctorThesis/releases",
        "Codes": "https://github.com/HowcanoeWang/DoctorThesis",
        "PPT": cdnAsset('/files/thesis/23_thesis_ppt.pdf')
    },
    "wang_estimating_2019": {
        "PDF": cdnAsset('/files/thesis/19_thesis.pdf'),
        "Codes": "https://github.com/HowcanoeWang/Spherical2TreeAttributes",
        "PPT": cdnAsset('/files/thesis/19_thesis_ppt.pdf')
    },
    "wang_extracting_2017": {
        "PDF": cdnAsset('/files/thesis/17_thesis.pdf'),
        "Codes": "https://github.com/HowcanoeWang/ImageDBH",
        "PPT": cdnAsset('/files/thesis/17_thesis_ppt.pdf')
    },

    ///////////
    // Other //
    ///////////
    "wang_easyidp_2024": {
        "PDF": cdnAsset('/files/books/24_easyidp_v2.pdf')
    },
    "wang_landscapescale_2017": {
        "PDF": cdnAsset('/files/patent/19_CAF.pdf')
    },
    "wang_uavhirapweb_2019": {
        "Codes": "https://github.com/UAV-HiRAP/UAV-HiRAP"
    },
    "wang_uavhirapweb_2017": {
        "Manual": cdnAsset('/files/patent/17_uavhirap2.pdf')
    },
    "wang_uavhirapapp_2016": {
        "Codes": "https://github.com/UAV-HiRAP/UAV-HiRAP-Matlab",
        "Manual": cdnAsset('/files/patent/16_uavhirap.pdf'),
        "EXE": "https://github.com/UAV-HiRAP/UAV-HiRAP-Matlab/releases/tag/v1.0"
    },
    "wang_yaira_2016": {
        "Codes": "https://github.com/HowcanoeWang/Yaira",
        "Manual": cdnAsset('/files/patent/16_yaira.pdf'),
        "EXE": "https://github.com/HowcanoeWang/Yaira/releases/tag/v1.0"
    }
};

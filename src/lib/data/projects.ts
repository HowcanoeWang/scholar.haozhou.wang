import { cdnAsset } from '$lib/constants/cdn';

export interface Project {
    title: string;
    /** Key in `public/files/repos.json`; drives the GitHub star chip. */
    slug: string;
    institution: string; // i18n key or text
    descriptionKey: string; // i18n key
    date: string;
    img: string;
    links: Array<{ label: string; url: string; }>;
}

export const projects: Project[] = [
    {
        title: "AgriTesseract",
        slug: 'agritesseract',
        institution: "inst.ut",
        descriptionKey: "proj.p7",
        date: "2025.09",
        img: cdnAsset('/files/imgs/cover_agritesseract.png'),
        links: [
            { label: "Code", url: "https://github.com/UTokyo-FieldPhenomics-Lab/AgriTesseract" }
        ]
    },
    {
        title: "PotatoScan",
        slug: 'potatoscan',
        institution: "inst.ut",
        descriptionKey: "proj.p6",
        date: "2023.09",
        img: cdnAsset('/files/imgs/cover_potatoscan.png'),
        links: [
            { label: "Code", url: "https://github.com/UTokyo-FieldPhenomics-Lab/PotatoScan" },
            { label: "Dataset", url: "https://doi.org/10.1016/j.plaphe.2025.100123" }
        ]
    },
    {
        title: "EasyAMS",
        slug: 'easyams',
        institution: "inst.ut",
        descriptionKey: "proj.p5",
        date: "2022.10",
        img: cdnAsset('/files/imgs/cover_easyams.jpg'),
        links: [
            { label: "Code", url: "https://github.com/UTokyo-FieldPhenomics-Lab/EasyAMS" }
        ]
    },
    {
        title: "EasyIDP",
        slug: 'easyidp',
        institution: "inst.ut",
        descriptionKey: "proj.p1",
        date: "2021.06",
        img: cdnAsset('/files/imgs/Github_Header_v2.0.png'),
        links: [
            { label: "Code", url: "https://github.com/UTokyo-FieldPhenomics-Lab/EasyIDP" },
            { label: "Manual", url: "https://easyidp.readthedocs.io/en/latest/" }
        ]
    },
    {
        title: "EasyDCP",
        slug: 'easydcp',
        institution: "inst.ut",
        descriptionKey: "proj.p2",
        date: "2021.04",
        img: cdnAsset('/files/imgs/21_easydcp.png'),
        links: [
            { label: "Code", url: "https://github.com/UTokyo-FieldPhenomics-Lab/EasyDCP" },
            { label: "Video", url: "https://www.youtube.com/watch?v=CbQEzUEybTo&ab_channel=U.TokyoInternationalFieldPhenomicsResearchLab" },
            { label: "News", url: "https://www.a.u-tokyo.ac.jp/topics/topics_20210615-1.html" }
        ]
    },
    {
        title: "Spherical2TreeAttributes",
        slug: 'spherical2tree',
        institution: "inst.unb",
        descriptionKey: "proj.p3",
        date: "2019.06",
        img: "https://cdn.jsdelivr.net/gh/HowcanoeWang/Spherical2TreeAttributes/img/4SoftwareScreen.jpg",
        links: [
            { label: "Code", url: "https://github.com/HowcanoeWang/Spherical2TreeAttributes" }
        ]
    },
    {
        title: "UAV-HiRAP",
        slug: 'uavhirap',
        institution: "inst.caf",
        descriptionKey: "proj.p4",
        date: "2018.10",
        img: cdnAsset('/files/imgs/uav-hirap_web.png'),
        links: [
            { label: "Web", url: "https://www.uav-hirap.org" },
            { label: "Code", url: "https://github.com/DrylandEcology-Lab/UAV-HiRAP" }
        ]
    }
];

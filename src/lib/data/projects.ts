export interface Project {
    title: string;
    institution: string; // i18n key or text
    descriptionKey: string; // i18n key
    date: string;
    img: string;
    links: Array<{ label: string; url: string; }>;
}

export const projects: Project[] = [
    {
        title: "EasyIDP",
        institution: "inst.ut",
        descriptionKey: "proj.p1",
        date: "2021.06",
        img: "./files/imgs/Github_Header_v2.0.png",
        links: [
            { label: "Code", url: "https://github.com/UTokyo-FieldPhenomics-Lab/EasyIDP" },
            { label: "Manual", url: "https://easyidp.readthedocs.io/en/latest/" }
        ]
    },
    {
        title: "EasyDCP",
        institution: "inst.ut",
        descriptionKey: "proj.p2",
        date: "2021.04",
        img: "./files/imgs/21_easydcp.png",
        links: [
            { label: "Code", url: "https://github.com/UTokyo-FieldPhenomics-Lab/EasyDCP" },
            { label: "Video", url: "https://www.youtube.com/watch?v=CbQEzUEybTo&ab_channel=U.TokyoInternationalFieldPhenomicsResearchLab" },
            { label: "News", url: "https://www.a.u-tokyo.ac.jp/topics/topics_20210615-1.html" }
        ]
    },
    {
        title: "Spherical2TreeAttributes",
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
        institution: "inst.caf",
        descriptionKey: "proj.p4",
        date: "2018.10",
        img: "./files/imgs/uav-hirap_web.png",
        links: [
            { label: "Web", url: "https://www.uav-hirap.org" },
            { label: "Code", url: "https://github.com/UAV-HiRAP/UAV-HiRAP" }
        ]
    }
];

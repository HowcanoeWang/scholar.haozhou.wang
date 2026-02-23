import { cdnAsset } from '$lib/constants/cdn';

export interface Award {
    img: string;
    titleKey: string;
    date: string;
    links: { label: string; url: string; }[];
    bibKey?: string;
}

export const awards: Award[] = [
    {
        img: cdnAsset('/files/awards/24_cigr.png'),
        titleKey: "awd.cigr24",
        date: "2024.05",
        links: [
            { label: "Web", url: "https://www.jsidre.or.jp/the-6th-cigr-international-conference-2024/" }
        ],
        bibKey: 'wang_3dpotatotwin_2024cigr'
    },
    {
        img: cdnAsset('/files/awards/21_jsai.jpg'),
        titleKey: "awd.jsai21",
        date: "2021.05",
        links: [
            { label: "Web", url: "https://www.jsai.or.jp/%E5%B9%B4%E6%AC%A1%E5%A4%A7%E4%BC%9A%E7%AD%89/%E5%B9%B4%E6%AC%A1%E5%A4%A7%E4%BC%9A/%E3%83%9D%E3%82%B9%E3%82%BF%E3%83%BC%E7%99%BA%E8%A1%A8#h.p_rjKRJzWedJ1g" }
        ],
        bibKey: "wang_easyidp_2021jsai"
    },
    {
        img: cdnAsset('/files/awards/21_liangxi.jpg'),
        titleKey: "awd.lx3",
        date: "2020.11",
        links: [
            { label: "Web", url: "http://www.csf.org.cn/news/noticeDetail.aspx?aid=48422" }
        ]
    },
    {
        img: cdnAsset('/files/awards/18_gsa.jpg'),
        titleKey: "awd.unb25",
        date: "2018.05",
        links: [
            { label: "Web", url: "https://www.facebook.com/UNBGRC/posts/1415698071909638" }
        ],
        bibKey: "wang_measuring_2018grc"
    }
];

export const awardi18n: Record<string, string> = awards.reduce((acc, award) => {
    if (award.bibKey) {
        acc[award.bibKey] = award.titleKey;
    }
    return acc;
}, {} as Record<string, string>);

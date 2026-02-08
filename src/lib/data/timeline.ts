export interface TimelineItem {
    period: string;
    periodSm: string;
    institutionKey: string;
    titleKey: string;
    descKey: string;
}

export const timeline: TimelineItem[] = [
    {
        period: "2026.02 | Present",
        periodSm: "2026.02-",
        institutionKey: "inst.ut",
        titleKey: "time.paf.title",
        descKey: "time.paf.intro"
    },
    {
        period: "2023.10 | 2026.01",
        periodSm: "2023.10-2026.01",
        institutionKey: "inst.ut",
        titleKey: "time.pdf.title",
        descKey: "time.pdf.intro"
    },
    {
        period: "2023.09 | 2020.04",
        periodSm: "2020.04-2023.09",
        institutionKey: "inst.ut",
        titleKey: "time.phd.title",
        descKey: "time.phd.intro"
    },
    {
        period: "2019.12 | 2017.09",
        periodSm: "2017.09-2019.12",
        institutionKey: "inst.unb",
        titleKey: "time.msc.title",
        descKey: "time.msc.intro"
    },
    {
        period: "2016.08 | 2016.05",
        periodSm: "2016.05-2016.08",
        institutionKey: "inst.caf",
        titleKey: "time.caf.title",
        descKey: "time.caf.intro"
    },
    {
        period: "2017.06 | 2013.09",
        periodSm: "2013.09-2017.06",
        institutionKey: "inst.nfu",
        titleKey: "time.bsc.title",
        descKey: "time.bsc.intro"
    }
];

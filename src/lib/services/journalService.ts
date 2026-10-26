/** Journal metrics for one publication venue, from `public/files/journal_metrics.json`. */
export interface JournalMetric {
    /** Journal Impact Factor as published in the latest JCR release. */
    if: number;
    /** Year of the JCR release that carries this value, e.g. 2026. */
    if_year: number;
    /** Index the journal is listed in, usually `SCI`. */
    indexed: string;
    /** Chinese Academy of Sciences partition, per site language. */
    cas: Record<'cn' | 'en' | 'jp', string>;
}

/** Journal name to metrics map. */
export type JournalMetrics = Record<string, JournalMetric>;

/**
 * Load journal metrics refreshed once a year after the JCR release.
 *
 * @param baseUrl
 *     Prefix for the file request, empty for the site root.
 * @returns
 *     Journal name to metrics map, or `null` when the file cannot be read.
 */
export async function fetchJournalMetrics(baseUrl: string = ''): Promise<JournalMetrics | null> {
    try {
        const response = await fetch(`${baseUrl}/files/journal_metrics.json`);
        if (!response.ok) {
            console.error('Failed to fetch journal_metrics.json');
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading journal metrics:', error);
        return null;
    }
}

/**
 * Render the badge line shown under a paper title.
 *
 * @param metrics
 *     Journal metrics map, or `null` before it loads.
 * @param journal
 *     Journal name as written in the publication data.
 * @param locale
 *     Active site language.
 * @returns
 *     e.g. `农林科学1区 Top, SCI, IF=8.2 (2026)`, or an empty string when the
 *     journal is missing from the file.
 */
export function formatJournalBadge(
    metrics: JournalMetrics | null,
    journal: string,
    locale: string
): string {
    const metric = metrics?.[journal];
    if (!metric) return '';
    const cas = metric.cas[locale as 'cn' | 'en' | 'jp'] ?? metric.cas.en;
    return `${cas}, ${metric.indexed}, IF=${metric.if} (${metric.if_year})`;
}

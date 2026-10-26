import { normalizeTitle } from './bibtexService';
import type { ScholarArticle } from './scholarService';
import { citationAliases } from '$lib/data/citationAliases';

/**
 * Find the Google Scholar row that corresponds to a BibTeX title.
 *
 * Matching order:
 *
 * 1. Exact normalised title match (letters and digits only).
 * 2. Exact match against an entry of {@link citationAliases}, for papers whose
 *    Scholar title differs by language or wording.
 * 3. Substring match, because Scholar truncates some long titles.
 *
 * @param articles
 *     Scholar article rows to search.
 * @param bibTitle
 *     Title as stored in the `.bib` file.
 * @returns
 *     The matching Scholar row, or `null` when nothing matches.
 */
export function findScholarArticle(
    articles: ScholarArticle[],
    bibTitle: string
): ScholarArticle | null {
    const target = normalizeTitle(bibTitle);
    if (!target) return null;

    const alias = citationAliases[target];
    const exact = articles.find((article) => {
        const scholarTitle = normalizeTitle(article.title);
        return scholarTitle === target || (!!alias && scholarTitle === alias);
    });
    if (exact) return exact;

    return (
        articles.find((article) => {
            const scholarTitle = normalizeTitle(article.title);
            return !!scholarTitle && (scholarTitle.includes(target) || target.includes(scholarTitle));
        }) ?? null
    );
}

import { normalizeTitle } from '$lib/services/bibtexService';

/**
 * Title bridges for Google Scholar entries that cannot be matched to a BibTeX
 * title by normalisation alone.
 *
 * Typical case: a paper is filed in the `.bib` under its English title while
 * Google Scholar lists it under the Chinese title, or the reverse. The scholar
 * citation count would otherwise be silently dropped from the publication list.
 *
 * Keys are `.bib` titles, values are the corresponding Google Scholar titles.
 * Both sides are normalised (lowercase, letters/digits only) before lookup.
 */
const RAW_ALIASES: Record<string, string> = {
    'Vegetation Type Classification and Fractional Vegetation Coverage Estimation for an Open Elm (Ulmus Pumila) Woodland Ecosystem during a Growing Season Based on an Unmanned Aerial Vehicle Platform Coupled with Decision Tree Algorithms':
        '基于无人机和决策树算法的榆树疏林草原植被类型划分和覆盖度生长季动态估计',
};

/**
 * Normalised lookup table built from {@link RAW_ALIASES}.
 *
 * Maps `normalizeTitle(bibTitle)` to `normalizeTitle(scholarTitle)`.
 */
export const citationAliases: Record<string, string> = Object.fromEntries(
    Object.entries(RAW_ALIASES).map(([bibTitle, scholarTitle]) => [
        normalizeTitle(bibTitle),
        normalizeTitle(scholarTitle),
    ])
);

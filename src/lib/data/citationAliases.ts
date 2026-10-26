import { normalizeTitle } from '$lib/services/bibtexService';
import rawAliases from './citationAliases.json';

/**
 * Title bridges for Google Scholar entries that cannot be matched to a BibTeX
 * title by normalisation alone.
 *
 * Typical case: a paper is filed in the `.bib` under its English title while
 * Google Scholar lists it under the Chinese title, or the reverse. The scholar
 * citation count would otherwise be silently dropped from the publication list.
 *
 * The pairs live in `citationAliases.json` so the CV build script
 * (`scripts/sync_cv_citations.py`) reads exactly the same mapping.
 */
const RAW_ALIASES: Record<string, string> = rawAliases;

/**
 * Normalised lookup table built from `citationAliases.json`.
 *
 * Maps `normalizeTitle(bibTitle)` to `normalizeTitle(scholarTitle)`.
 */
export const citationAliases: Record<string, string> = Object.fromEntries(
    Object.keys(RAW_ALIASES).map((bibTitle) => [
        normalizeTitle(bibTitle),
        normalizeTitle(RAW_ALIASES[bibTitle]),
    ])
);

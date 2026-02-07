import { BibLatexParser } from "biblatex-csl-converter";

// Minimal type definition for the parser output since the library might not provide full types
export interface BibEntry {
    entry_key: string;
    bib_type: 'article' | 'report' | 'thesis' | string;
    fields: {
        title: any[];
        author: any[];
        date?: string;
        journaltitle?: any[];
        volume?: any[];
        pages?: any[];
        location?: any[];
        institution?: any[];
        doi?: string;
        [key: string]: any;
    };
}

export interface BibJson {
    entries: { [key: string]: BibEntry } | BibEntry[];
    [key: string]: any;
}

export async function fetchBibTeX(baseUrl: string = ''): Promise<BibJson | null> {
    try {
        const response = await fetch(`${baseUrl}/files/publications.bib`);
        if (!response.ok) {
            throw new Error('Failed to fetch publications.bib');
        }
        const bibContent = await response.text();
        
        // Clean up bib content: replace @software with @misc as the parser doesn't support @software
        const cleanContent = bibContent.replace(/@software/g, '@misc');

        // Parse BibTeX
        const parser = new BibLatexParser(cleanContent, { processUnexpected: true, processUnknown: true });
        const bibjson = parser.parse();
        
        // Merge unexpected_fields into fields for easier access
        if (bibjson.entries) {
            Object.values(bibjson.entries).forEach((entry: any) => {
                if (entry.unexpected_fields) {
                    entry.fields = { ...entry.fields, ...entry.unexpected_fields };
                }
            });
        }

        return bibjson as unknown as BibJson;
    } catch (error) {
        console.error('Error loading BibTeX data:', error);
        return null;
    }
}

export function normalizeTitle(t: string | undefined | null) {
    if (!t) return '';
    // normalize title to only alphabet and number, supporting unicode (e.g. Chinese)
    // remove everything that is not a letter or number
    return t.trim().toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

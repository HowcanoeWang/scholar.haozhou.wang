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
        
        // Parse BibTeX
        const parser = new BibLatexParser(bibContent, { processUnexpected: true, processUnknown: true });
        const bibjson = parser.parse();
        
        return bibjson as unknown as BibJson;
    } catch (error) {
        console.error('Error loading BibTeX data:', error);
        return null;
    }
}

export function normalizeTitle(t: string) {
    // normalize title to only alphabet and number
    return t.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

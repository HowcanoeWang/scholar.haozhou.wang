
export interface ScholarArticle {
    title: string;
    authors: string;
    publication: string;
    year: string;
    cited_by: number;
}

export interface ScholarData {
    author: {
        name: string;
        [key: string]: any;
    };
    articles: ScholarArticle[];
    table: Array<{
        citations: { all: number; since_2018?: number };
        h_index: { all: number; since_2018?: number };
        i10_index: { all: number; since_2018?: number };
    }>;
    graph: Array<{ year: number; citations: number }>;
}

export async function fetchScholarData(baseUrl: string = ''): Promise<ScholarData | null> {
    try {
        const response = await fetch(`${baseUrl}/files/scholar.json`);
        if (!response.ok) {
            console.error('Failed to fetch scholar.json');
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading scholar data:', error);
        return null;
    }
}

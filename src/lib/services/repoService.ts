/** Star counts per repository slug, as published in `public/files/repos.json`. */
export type RepoStats = Record<string, number>;

/**
 * Load the GitHub star counts refreshed by `scripts/update_github_stats.py`.
 *
 * @param baseUrl
 *     Prefix for the file request, empty for the site root and the base path
 *     when the site is served from a subdirectory.
 * @returns
 *     Slug to star count map, or `null` when the file cannot be read.
 */
export async function fetchRepoStats(baseUrl: string = ''): Promise<RepoStats | null> {
    try {
        const response = await fetch(`${baseUrl}/files/repos.json`);
        if (!response.ok) {
            console.error('Failed to fetch repos.json');
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading repository stats:', error);
        return null;
    }
}

/**
 * Load the HuggingFace dataset like counts refreshed next to the star counts.
 *
 * @param baseUrl
 *     Prefix for the file request, empty for the site root.
 * @returns
 *     Dataset slug to like count map, or `null` when the file cannot be read.
 */
export async function fetchDatasetLikes(baseUrl: string = ''): Promise<RepoStats | null> {
    try {
        const response = await fetch(`${baseUrl}/files/hf_likes.json`);
        if (!response.ok) {
            console.error('Failed to fetch hf_likes.json');
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading dataset likes:', error);
        return null;
    }
}

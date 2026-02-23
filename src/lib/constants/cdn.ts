export type AssetProvider = 'github' | 'jsdelivr' | 'custom';

const REPO_OWNER = 'HowcanoeWang';
const REPO_NAME = 'scholar.haozhou.wang';
const REPO_REF = 'main';

// Global switch: 'github' | 'jsdelivr' | 'custom'
export const ASSET_PROVIDER: AssetProvider = 'github';

// Reserved for future OSS/custom static domain.
// Example: 'https://static.haozhou.wang'
export const CUSTOM_ASSET_BASE = '';

const PROVIDER_BASES: Record<AssetProvider, string> = {
  github: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_REF}/public`,
  jsdelivr: `https://cdn.jsdelivr.net/gh/${REPO_OWNER}/${REPO_NAME}@${REPO_REF}/public`,
  custom: CUSTOM_ASSET_BASE,
};

export function getAssetBase(provider: AssetProvider = ASSET_PROVIDER): string {
  const base = PROVIDER_BASES[provider]?.trim();
  if (base) return base.replace(/\/$/, '');
  return PROVIDER_BASES.github;
}

export const PUBLIC_CDN_BASE = getAssetBase();

export function cdnAsset(path: string): string {
  if (!path) return PUBLIC_CDN_BASE;
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path
    .replace(/^\.\//, '/')
    .replace(/^[^/]/, '/$&');

  return `${PUBLIC_CDN_BASE}${normalizedPath}`;
}

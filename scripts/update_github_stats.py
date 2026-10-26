"""Refresh GitHub star counts used by the site and the CV.

Writes a flat `slug -> stars` map to `public/files/repos.json`. The slugs match
the `slug` field of `src/lib/data/projects.ts` and the keys used by
`\\starcount{<slug>}` in `public/files/cv.tex`.

Run manually with:

    $ GITHUB_TOKEN=... python scripts/update_github_stats.py

The weekly data workflow runs it without a token; the anonymous rate limit
(60 requests per hour) is far above the handful of repositories listed here.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEST_PATH = ROOT / "public/files/repos.json"
DATASETS_PATH = ROOT / "public/files/hf_likes.json"

REPOSITORIES: dict[str, str] = {
    "easyidp": "UTokyo-FieldPhenomics-Lab/EasyIDP",
    "easydcp": "UTokyo-FieldPhenomics-Lab/EasyDCP",
    "easyams": "UTokyo-FieldPhenomics-Lab/EasyAMS",
    "agritesseract": "UTokyo-FieldPhenomics-Lab/AgriTesseract",
    "potatoscan": "UTokyo-FieldPhenomics-Lab/PotatoScan",
    "spherical2tree": "HowcanoeWang/Spherical2TreeAttributes",
    "uavhirap": "DrylandEcology-Lab/UAV-HiRAP",
    "uavbroccoli": "UTokyo-FieldPhenomics-Lab/UAVbroccoli",
}

DATASETS: dict[str, str] = {
    "3dpotatotwin": "UTokyo-FieldPhenomics-Lab/3DPotatoTwin",
}


def fetch_stars(repository: str, token: str | None) -> int:
    """Read the star count of one repository.

    Parameters
    ----------
    repository : str
        Repository in `owner/name` form.
    token : str | None
        GitHub token; used when present to lift the anonymous rate limit.

    Returns
    -------
    int
        Current number of stargazers.

    Raises
    ------
    RuntimeError
        If the API does not answer with a usable payload.
    """
    request = urllib.request.Request(
        f"https://api.github.com/repos/{repository}",
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "scholar.haozhou.wang",
            **({"Authorization": f"Bearer {token}"} if token else {}),
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"{repository}: HTTP {error.code}") from error
    if "stargazers_count" not in payload:
        raise RuntimeError(f"{repository}: unexpected payload")
    return int(payload["stargazers_count"])


def fetch_likes(dataset: str) -> int:
    """Read the like count of one HuggingFace dataset.

    Parameters
    ----------
    dataset : str
        Dataset in `owner/name` form.

    Returns
    -------
    int
        Number of likes on the dataset page.

    Raises
    ------
    RuntimeError
        If the API does not answer with a usable payload.
    """
    request = urllib.request.Request(
        f"https://huggingface.co/api/datasets/{dataset}",
        headers={"User-Agent": "scholar.haozhou.wang"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"{dataset}: HTTP {error.code}") from error
    if "likes" not in payload:
        raise RuntimeError(f"{dataset}: unexpected payload")
    return int(payload["likes"])


def main() -> int:
    """Write `public/files/repos.json`.

    Returns
    -------
    int
        Process exit code.
    """
    token = os.getenv("GITHUB_TOKEN")
    stats: dict[str, int] = {}
    for slug, repository in REPOSITORIES.items():
        stats[slug] = fetch_stars(repository, token)
        print(f"{stats[slug]:>5}  {slug:<14} {repository}")

    likes: dict[str, int] = {}
    for slug, dataset in DATASETS.items():
        likes[slug] = fetch_likes(dataset)
        print(f"{likes[slug]:>5}  ♥ {slug:<12} {dataset}")

    DEST_PATH.write_text(
        json.dumps(stats, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    DATASETS_PATH.write_text(
        json.dumps(likes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"written: {DEST_PATH.relative_to(ROOT)}")
    print(f"written: {DATASETS_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as failure:
        print(failure, file=sys.stderr)
        raise SystemExit(1) from failure

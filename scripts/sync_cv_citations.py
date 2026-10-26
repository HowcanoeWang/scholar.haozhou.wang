"""Write the citation counts used by `cv.tex` from the Google Scholar snapshot.

The CV names each featured paper with `\\fullcite{<bib key>}`, and the citation
count follows as `\\citecount{<bib key>}`. LaTeX cannot look a BibTeX key up in
Google Scholar data, so this script resolves the key to its title, matches that
title against `public/files/scholar.json`, and writes a flat JSON map that
`jsonparse` can read inside the document.

Run it before compiling the CV:

    $ python scripts/sync_cv_citations.py && latexmk -xelatex public/files/cv.tex
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BIB_PATH = ROOT / "public/files/publications.bib"
SCHOLAR_PATH = ROOT / "public/files/scholar.json"
ALIAS_PATH = ROOT / "src/lib/data/citationAliases.json"
CV_PATH = ROOT / "public/files/cv.tex"
DEST_PATH = ROOT / "public/files/cv_citations.json"


def normalize(text: str) -> str:
    """Reduce a title to lowercase letters and digits for comparison.

    Parameters
    ----------
    text : str
        Any title string.

    Returns
    -------
    str
        The comparable form, or an empty string for empty input.
    """
    return "".join(char for char in text.lower() if char.isalnum())


def read_balanced(text: str, start: int) -> str:
    """Read a brace-balanced group starting at `start`.

    Parameters
    ----------
    text : str
        Source text.
    start : int
        Index of the opening brace.

    Returns
    -------
    str
        The inner text without the outermost braces.
    """
    depth = 0
    for index in range(start, len(text)):
        if text[index] == "{":
            depth += 1
        elif text[index] == "}":
            depth -= 1
            if depth == 0:
                return text[start + 1 : index]
    raise ValueError("unbalanced braces in bibliography entry")


def parse_bib_titles(text: str) -> dict[str, str]:
    """Map every BibTeX key to its title.

    Parameters
    ----------
    text : str
        Contents of a `.bib` file.

    Returns
    -------
    dict[str, str]
        Entry key to raw title (braces and LaTeX macros stripped later).
    """
    titles: dict[str, str] = {}
    for match in re.finditer(r"@\w+\s*\{\s*([^,\s]+)\s*,", text):
        key = match.group(1)
        rest = text[match.end() :]
        title_match = re.search(r"title\s*=\s*\{", rest)
        if not title_match:
            continue
        raw = read_balanced(rest, title_match.end() - 1)
        titles[key] = clean_title(raw)
    return titles


def clean_title(raw: str) -> str:
    """Strip LaTeX escaping and braces from a title.

    Parameters
    ----------
    raw : str
        Title as written in the `.bib` file.

    Returns
    -------
    str
        Plain title text.
    """
    text = raw.replace(r"\mkbibemph", "").replace("{", "").replace("}", "")
    return text.replace("\\", " ").strip()


def load_cv_keys(text: str) -> list[str]:
    """Collect the BibTeX keys referenced through `\\citecount` in the CV.

    Parameters
    ----------
    text : str
        Contents of `cv.tex`.

    Returns
    -------
    list[str]
        Keys in order of appearance, without duplicates.
    """
    keys: list[str] = []
    for key in re.findall(r"\\citecount\{([^}]+)\}", text):
        if key not in keys:
            keys.append(key)
    return keys


def find_cites(key: str, titles: dict[str, str], articles: list[dict], aliases: dict[str, str]) -> int:
    """Look up the citation count of one BibTeX entry.

    Parameters
    ----------
    key : str
        BibTeX entry key.
    titles : dict[str, str]
        Entry key to title mapping.
    articles : list[dict]
        Rows from `scholar.json`.
    aliases : dict[str, str]
        Bib title to Scholar title overrides.

    Returns
    -------
    int
        Citation count reported by Google Scholar.

    Raises
    ------
    KeyError
        If the key is absent from the bibliography or no Scholar row matches.
    """
    if key not in titles:
        raise KeyError(f"{key}: not found in publications.bib")
    target = normalize(titles[key])
    alias = aliases.get(titles[key])
    alias_norm = normalize(alias) if alias else ""

    for article in articles:
        scholar = normalize(article["title"])
        if scholar == target or (alias_norm and scholar == alias_norm):
            return int(article["cited_by"] or 0)

    for article in articles:
        scholar = normalize(article["title"])
        if scholar and (target in scholar or scholar in target):
            return int(article["cited_by"] or 0)

    raise KeyError(f"{key}: no Google Scholar row matches {titles[key]!r}")


def main() -> int:
    """Generate `public/files/cv_citations.json`.

    Returns
    -------
    int
        Process exit code.
    """
    titles = parse_bib_titles(BIB_PATH.read_text(encoding="utf-8"))
    articles = json.loads(SCHOLAR_PATH.read_text(encoding="utf-8"))["articles"]
    aliases = json.loads(ALIAS_PATH.read_text(encoding="utf-8"))
    keys = load_cv_keys(CV_PATH.read_text(encoding="utf-8"))

    counts: dict[str, int] = {}
    failures: list[str] = []
    for key in keys:
        try:
            counts[key] = find_cites(key, titles, articles, aliases)
        except KeyError as error:
            failures.append(str(error))

    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1

    DEST_PATH.write_text(
        json.dumps(dict(sorted(counts.items())), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    for key, value in counts.items():
        print(f"{value:>4}  {key}")
    print(f"written: {DEST_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

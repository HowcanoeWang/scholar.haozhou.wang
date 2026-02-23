import json
import os


def get_serpapi_key() -> str:
    """Get SerpApi key from env var or local file.

    Returns
    -------
    str
        SerpApi API key.

    Raises
    ------
    FileNotFoundError
        If local key file does not exist and env var is not set.
    """
    api_key = os.getenv("SERPAPI_KEY")
    if api_key:
        return api_key

    key_file = "serpapi.txt"
    if not os.path.exists(key_file):
        raise FileNotFoundError(
            f"本地API key文件 {key_file} 未找到。"
            "请确保文件存在或设置SERPAPI_KEY环境变量"
        )

    with open(key_file, "r", encoding="utf-8") as handle:
        return handle.read().strip()


def fetch_with_serpapi(params: dict) -> dict:
    """Fetch data from SerpApi.

    Parameters
    ----------
    params : dict
        Request parameters for SerpApi.

    Returns
    -------
    dict
        Parsed JSON response.
    """
    from serpapi import GoogleSearch

    return GoogleSearch(params).get_dict()


def fetch_author_results(
    api_key: str,
    author_id: str,
    locales: list[str] | None = None,
    fetcher=fetch_with_serpapi,
) -> dict:
    """Fetch author data with locale fallback.

    Parameters
    ----------
    api_key : str
        SerpApi key.
    author_id : str
        Google Scholar author ID.
    locales : list[str] | None, optional
        Locale fallback order.
    fetcher : callable
        Function used to fetch API data.

    Returns
    -------
    dict
        First response that contains author, articles, and cited_by.

    Raises
    ------
    ValueError
        If no locale returns required data.
    """
    locale_chain = locales or ["en", "zh-CN", "zh-TW", "ja"]
    last_result = {}
    for locale in locale_chain:
        params = {
            "engine": "google_scholar_author",
            "author_id": author_id,
            "hl": locale,
            "num": 100,
            "api_key": api_key,
        }
        last_result = fetcher(params)
        has_required = all(
            key in last_result for key in ("author", "articles", "cited_by")
        )
        if has_required:
            return last_result

    raise ValueError(
        "未获取到作者数据，请检查author_id或尝试更多语言参数。"
        f"最后一次返回字段: {sorted(last_result.keys())}"
    )


def build_output_payload(results: dict) -> dict:
    """Build output payload used by the frontend.

    Parameters
    ----------
    results : dict
        Raw SerpApi author response.

    Returns
    -------
    dict
        Payload containing citation table/graph and article list.
    """
    cited_by = results.get("cited_by", {})
    table = normalize_citation_table(cited_by.get("table", []))
    payload = {
        "author": results.get("author", {}),
        "table": table,
        "graph": cited_by.get("graph", []),
        "articles": [],
    }

    for article in results.get("articles", []):
        payload["articles"].append(
            {
                "title": article.get("title", ""),
                "authors": article.get("authors", ""),
                "publication": article.get("publication", ""),
                "year": article.get("year", ""),
                "cited_by": (article.get("cited_by") or {}).get("value", 0),
            }
        )

    return payload


def normalize_citation_table(raw_table: list[dict]) -> list[dict]:
    """Normalize citation metrics to stable frontend keys.

    Parameters
    ----------
    raw_table : list[dict]
        Raw citation table from SerpApi.

    Returns
    -------
    list[dict]
        Citation table keyed by citations/h_index/i10_index.
    """
    metric_names = ["citations", "h_index", "i10_index"]
    normalized = []
    for idx, row in enumerate(raw_table):
        if idx >= len(metric_names) or not isinstance(row, dict) or not row:
            continue

        values = next(iter(row.values()))
        if not isinstance(values, dict):
            values = {}

        metric = {"all": values.get("all", 0)}
        for key, value in values.items():
            if key != "all":
                metric["since_2021"] = value
                break

        normalized.append({metric_names[idx]: metric})

    return normalized


def save_payload(payload: dict, output_path: str) -> None:
    """Persist scholar payload to disk.

    Parameters
    ----------
    payload : dict
        Final data payload.
    output_path : str
        Output JSON file path.
    """
    with open(output_path, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)


def main() -> None:
    """Fetch scholar author data and save JSON payload."""
    print("run get_google_scholar.py")
    api_key = get_serpapi_key()
    author_id = os.getenv("SCHOLAR_AUTHOR_ID", "CnTTa3EAAAAJ")
    results = fetch_author_results(api_key=api_key, author_id=author_id)
    payload = build_output_payload(results)
    output_path = os.path.join(
        os.path.dirname(__file__), "../public/files/scholar.json"
    )
    save_payload(payload, output_path)
    print(f"作者: {payload.get('author', {}).get('name', 'unknown')}")
    print("json saved")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"请求失败: {exc}; args: {exc.args}")

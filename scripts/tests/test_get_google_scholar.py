import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from get_google_scholar import build_output_payload, fetch_author_results


def test_build_output_payload_maps_articles_and_citation_data() -> None:
    data = {
        "cited_by": {
            "table": [{"citations": {"all": 10, "since_2021": 5}}],
            "graph": [{"year": 2025, "citations": 8}],
        },
        "articles": [
            {
                "title": "Paper A",
                "authors": "A, B",
                "publication": "Journal",
                "year": "2025",
                "cited_by": {"value": 3},
            },
            {
                "title": "Paper B",
                "authors": "C, D",
                "publication": "Conf",
                "year": "2024",
            },
        ],
    }

    payload = build_output_payload(data)

    assert payload["table"] == [{"citations": {"all": 10, "since_2021": 5}}]
    assert payload["graph"] == [{"year": 2025, "citations": 8}]
    assert payload["articles"][0]["cited_by"] == 3
    assert payload["articles"][1]["cited_by"] == 0


def test_build_output_payload_normalizes_localized_table_keys() -> None:
    data = {
        "cited_by": {
            "table": [
                {"引用": {"all": 20, "2021_年至今": 18}},
                {"h_指数": {"all": 3, "2021_年至今": 2}},
                {"i10_指数": {"all": 1, "2021_年至今": 1}},
            ],
            "graph": [],
        },
        "articles": [],
    }

    payload = build_output_payload(data)

    assert payload["table"][0]["citations"]["all"] == 20
    assert payload["table"][1]["h_index"]["all"] == 3
    assert payload["table"][2]["i10_index"]["all"] == 1


def test_fetch_author_results_retries_when_profile_hidden_for_locale() -> None:
    responses = {
        "en": {"search_metadata": {}, "search_parameters": {}},
        "zh-CN": {
            "author": {"name": "Haozhou Wang"},
            "articles": [{"title": "Paper"}],
            "cited_by": {"table": [], "graph": []},
        },
    }

    def fake_fetcher(params: dict) -> dict:
        return responses[params["hl"]]

    result = fetch_author_results(
        api_key="dummy",
        author_id="CnTTa3EAAAAJ",
        locales=["en", "zh-CN"],
        fetcher=fake_fetcher,
    )

    assert result["author"]["name"] == "Haozhou Wang"

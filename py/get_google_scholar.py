import os
import json

print("run get_google_scholar.py")

from serpapi import GoogleSearch

def get_serpapi_key():
    # Try to get API key from environment variable (GitHub Actions)
    SERPAPI_KEY = os.getenv("SERPAPI_KEY")

    if SERPAPI_KEY:
        return SERPAPI_KEY
    else:
        # Local development - try to get API key from file
        api_key_file = 'serpapi.txt'
        if not os.path.exists(api_key_file):
            raise FileNotFoundError(
                f"本地API key文件 {api_key_file} 未找到。"
                "请确保文件存在或设置SERPAPI_KEY环境变量"
            )
        with open(api_key_file, 'r') as f:
            return f.read().strip()
        
# 获取凭证
api_key = get_serpapi_key()

params = {
  "engine": "google_scholar_author",
  "author_id": "CnTTa3EAAAAJ",
  "api_key": api_key
}

try:
    search = GoogleSearch(params)
    results = search.get_dict()
    print(f"作者: {results.get('author', {}).get('name')}")

    sout = {}
    sout = results['cited_by']

    sout['articles'] = []
    for art_dict in results['articles']:
        selected_dict = {}
        selected_dict['title'] = art_dict['title']
        selected_dict['authors'] = art_dict['authors']
        selected_dict['publication'] = art_dict['publication']
        selected_dict['year'] = art_dict['year']
        selected_dict['cited_by'] = art_dict['cited_by']['value']

        sout['articles'].append(selected_dict)

    print("start saving json")
    with open('../files/scholar.json', 'w') as f:
        json.dump(sout, f)
        
    print("json saved")
    
except Exception as e:
    print(f"请求失败: {e}")

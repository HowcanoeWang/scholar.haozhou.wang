import json

from scholarly import scholarly

author = scholarly.search_author_id('CnTTa3EAAAAJ')

sout = scholarly.fill(author, sections=['indices', 'counts'])

# only save 'citedby', 'citedby5y', 'hindex', 'hindex5y', 'i10index', 'i10index5y', 'coauthors', 'cites_per_year' to json file
sout = {k: sout[k] for k in ('citedby', 'citedby5y', 'hindex', 'hindex5y', 'i10index', 'i10index5y', 'cites_per_year')}
with open('../files/scholar.json', 'w') as f:
    json.dump(sout, f)
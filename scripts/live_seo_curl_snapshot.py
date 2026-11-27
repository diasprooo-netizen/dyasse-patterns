#!/usr/bin/env python3
"""Generate a production SSR SEO report using curl only (no browser JavaScript)."""
import concurrent.futures as cf
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
import hashlib, json, re, subprocess, tempfile
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT='https://dyasse.com'
UA={'Browser':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/158.0.0.0 Safari/537.36',
    'Googlebot':'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'}
PAGES=['/','/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf',
 '/product/crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download',
 '/collections/crochet-bags','/guides/crochet-patterns-for-beginners','/our-story','/faq']
ESSENTIAL=['http://dyasse.com/','https://www.dyasse.com/']+[ROOT+p for p in PAGES]+[
 ROOT+'/robots.txt',ROOT+'/sitemap.xml',ROOT+'/cart',ROOT+'/account',ROOT+'/account/login',
 ROOT+'/favorites',ROOT+'/studio-preview',ROOT+'/checkout']
UTILITY=['/search?q=crochet','/search','/patterns','/collections/crochet-patterns?page=2',
 '/collections/crochet-patterns?page=999','/collections/crochet-patterns?sort=latest',
 '/cart','/checkout','/favorites','/account','/account/login','/account/signup',
 '/account/orders','/account/profile','/account/addresses','/account/favorites',
 '/admin','/admin/import','/studio-preview','/rose-bag','/support','/products','/login',
 '/kids-quest','/auth-debug']
DRAFTS=['crochet-beach-bag-rainbow-granny-stripe-large-cotton-shoulder-tote',
 'crochet-cookie-keychain-pattern-pdf-kawaii-biscuit-amigurumi-bag-charm-sandwich-plush-tutorial',
 'crochet-dinosaur-pattern-pdf-t-rex-amigurumi-plush-toy-dino-crochet-download',
 'custom-crochet-laptop-sleeve-puffy-cloud-chenille-tablet-case-handmade-padded-tech-cover',
 'matching-dog-and-owner-set-handmade-greyhound-snood-and-twisted-headband-chenille-winter-gift']
SAMPLE=[('crochet-cow-baby-booties-pattern-pdf-newborn-farm-animal-shoes-0-3-month-tutorial',487),
 ('crochet-bucket-hat-pattern-pdf-burgundy-bow-sun-hat-with-mesh-brim-for-women',422),
 ('crochet-vintage-car-keychain-pattern-pdf-retro-amigurumi-auto-bag-charm',446),
 ('crochet-baby-sandals-pattern-pdf-red-gold-t-strap-shoes-double-sole-and-headband-set',639),
 ('crochet-baby-booties-pattern-pdf-ballerina-shoes-and-headband-set-with-satin-bow',557),
 ('strawberry-airpods-pro-case-crochet-pattern-pdf-kawaii-earbud-keychain-cover',647),
 ('crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download',367),
 ('striped-crochet-hobo-bag-pattern-pdf-origami-fold-geometric-tote',299),
 ('christmas-tree-keychain-crochet-pattern-pdf-mini-holiday-tree-ornament-festive-crochet-pattern',356),
 ('amigurumi-mouse-keychain-crochet-pattern-pdf',373)]
BT=chr(96)

def curl(url, agent='Browser', timeout=27):
    with tempfile.TemporaryDirectory() as d:
        h,b=Path(d)/'headers',Path(d)/'body'
        args=['curl','-sS','-L','--compressed','--max-redirs','8','--connect-timeout','9',
              '--max-time',str(timeout),'-A',UA[agent],'-H',
              'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              '-D',str(h),'-o',str(b),'-w','%{http_code}\n%{url_effective}\n%{num_redirects}\n',url]
        try:
            p=subprocess.run(args,text=True,capture_output=True,timeout=timeout+10)
            lines=p.stdout.splitlines(); status=int(lines[0]) if lines and lines[0].isdigit() else 0
            raw=h.read_text(errors='replace') if h.exists() else ''
            body=b.read_bytes().decode('utf-8','replace') if b.exists() else ''
            chain=[]
            for block in re.split(r'\r?\n\r?\n',raw):
                x=block.splitlines()
                if x and x[0].startswith('HTTP/'):
                    hh={}
                    for line in x[1:]:
                        if ':' in line:
                            k,v=line.split(':',1);hh[k.strip().lower()]=v.strip()
                    m=re.search(r'\b\d{3}\b',x[0]);chain.append({'status':int(m.group()) if m else 0,'headers':hh})
            return dict(status=status,body=body,headers=chain[-1]['headers'] if chain else {},
                        chain=chain,final=lines[1] if len(lines)>1 else None,
                        redirects=lines[2] if len(lines)>2 else None,
                        error=p.stderr.strip(),exit=p.returncode)
        except Exception as e:return dict(status=0,body='',headers={},chain=[],final=None,redirects=None,error=str(e),exit=-1)

class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title='';self.capture_title=False;self.description=None;self.robots=None;self.canonical=None
        self.headings={'h1':[],'h2':[]};self.heading=None;self.ht=[]
        self.main=0;self.ignore=0;self.maintext=[];self.anchors=[];self.anchor=None;self.alts=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='title':self.capture_title=True
        if tag=='meta':
            if (a.get('name') or '').lower()=='description':self.description=a.get('content')
            if (a.get('name') or '').lower()=='robots':self.robots=a.get('content')
        if tag=='link' and 'canonical' in (a.get('rel') or '').lower().split():self.canonical=a.get('href')
        if tag in ('h1','h2'):self.heading=tag;self.ht=[]
        if tag=='main':self.main+=1
        if tag in ('script','style','noscript','nav','aside','footer','svg'):self.ignore+=1
        if tag=='img':self.alts.append(a.get('alt',''))
        if tag=='a' and self.main:self.anchor={'href':a.get('href',''),'text':[]}
    def handle_endtag(self,tag):
        if tag==self.heading:
            self.headings[tag].append(re.sub(r'\s+',' ',' '.join(self.ht)).strip());self.heading=None;self.ht=[]
        if tag=='a' and self.anchor:
            self.anchor['text']=re.sub(r'\s+',' ',' '.join(self.anchor['text'])).strip()
            self.anchors.append(self.anchor);self.anchor=None
        if tag in ('script','style','noscript','nav','aside','footer','svg'):self.ignore=max(0,self.ignore-1)
        if tag=='main':self.main=max(0,self.main-1)
        if tag=='title':self.capture_title=False
    def handle_data(self,d):
        if self.capture_title:self.title+=d
        if self.heading:self.ht.append(d)
        if self.anchor:self.anchor['text'].append(d)
        if self.main and not self.ignore:self.maintext.append(d)

def words(s):return len(re.findall(r"[A-Za-z0-9]+(?:['\u2019-][A-Za-z0-9]+)*",s or ''))
def parse(body):
    p=Extract()
    try:p.feed(body)
    except Exception:pass
    m=re.search(r'<a\b[^>]*aria-label=["\']dyasse[^"\']*["\'][^>]*>[\s\S]*?</a>',body,re.I)
    logo_raw=unescape(re.sub(r'<[^>]+>','',m.group(0))) if m else ''
    logo_aria=re.search(r'aria-label=["\']([^"\']+)',m.group(0)).group(1) if m else None
    blocks=re.findall(r'<script\b(?=[^>]*type=["\']application/ld\+json["\'])[^>]*>([\s\S]*?)</script>',body,re.I)
    main=' '.join(p.maintext)
    internal=[v['href'] for v in p.anchors if v['href'].startswith('/') or v['href'].startswith(ROOT)]
    return dict(title=p.title,description=p.description,robots=p.robots,canonical=p.canonical,
       headings=p.headings,logo_raw=re.sub(r'\s+',' ',logo_raw).strip(),logo_aria=logo_aria,
       mainwords=words(main),internal=len(internal),distinct=len(set(internal)),alts=p.alts[:5],
       etsy_earlier='from our earlier etsy shop' in main.lower(),
       curated=bool(re.search(r'cherry.picked|selected Etsy reviews',main,re.I)),
       coming=bool(re.search(r'coming soon',main,re.I)),
       cominglinks=[v for v in p.anchors if 'coming soon' in v['text'].lower()],jsonld=blocks)

def md(v):return str(v if v is not None and v!='' else '\u2014').replace('|',r'\|').replace('\n',' ')
def table(lines,headers,rows):
    lines.append('| '+' | '.join(headers)+' |');lines.append('| '+' | '.join('---' for _ in headers)+' |')
    for r in rows:lines.append('| '+' | '.join(md(v) for v in r)+' |')
def fence(lines,lang,s):lines.extend([BT*3+lang,s.rstrip('\n'),BT*3])
def chain(r):return ' -> '.join(str(x['status']) for x in r['chain']) or str(r['status'])
def hops(r):return ' -> '.join(x['headers'].get('location','') for x in r['chain'] if x['headers'].get('location')) or '\u2014'
def noindex(r):return 'noindex' in (str(parse(r['body'])['robots'])+' '+str(r['headers'].get('x-robots-tag'))).lower()

def main():
    now=datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')
    fixed={}
    with cf.ThreadPoolExecutor(max_workers=6) as pool:
        fs={pool.submit(curl,u,a,30):(u,a) for u in dict.fromkeys(ESSENTIAL) for a in UA}
        for f in cf.as_completed(fs):fixed[fs[f]]=f.result()
    robots=fixed[(ROOT+'/robots.txt','Browser')]
    sitemap=fixed[(ROOT+'/sitemap.xml','Browser')]
    entries=[];parse_error=None
    try:
        xml=ET.fromstring(sitemap['body'])
        for item in xml.findall('.//{*}url'):
            loc=item.find('{*}loc');last=item.find('{*}lastmod')
            if loc is not None and loc.text:entries.append((loc.text.strip(),last.text if last is not None else None))
    except Exception as e:parse_error=str(e)
    def kind(u):
        p=urlsplit(u).path
        if p=='/':return 'homepage'
        if p.startswith('/product/'):return 'products'
        if p.startswith('/collections/'):return 'categories incl pagination'
        if p=='/guides' or p.startswith('/guides/'):return 'guides'
        if p in ['/about','/contact','/faq','/privacy']:return 'core'
        if p=='/patterns':return 'catalog'
        if p.startswith(('/cart','/checkout','/account','/favorites','/search','/studio-preview')):return 'utility/coming soon'
        return 'other'
    kinds={k:sum(kind(u)==k for u,_ in entries) for k in ['homepage','categories incl pagination','guides','products','core','catalog','utility/coming soon','other']}
    def inspect(item):
        u,a=item;r=fixed.get((u,a)) or curl(u,a,25)
        p=parse(r['body']) if '<html' in r['body'][:150].lower() else {}
        return dict(url=u,ua=a,status=r['status'],robots=p.get('robots'),xrobots=r['headers'].get('x-robots-tag'),cf_mitigated=r['headers'].get('cf-mitigated'),error=r['error'] if r['exit'] else '')
    with cf.ThreadPoolExecutor(max_workers=6) as pool:
        sitemap_results=list(pool.map(inspect,((u,a) for u,_ in entries for a in UA)))
    utility={}
    with cf.ThreadPoolExecutor(max_workers=6) as pool:
        fs={pool.submit(curl,ROOT+u,'Browser',28):u for u in UTILITY if (ROOT+u,'Browser') not in fixed}
        for f in cf.as_completed(fs):utility[fs[f]]=f.result()
    for u in UTILITY:
        if (ROOT+u,'Browser') in fixed:utility[u]=fixed[(ROOT+u,'Browser')]
    drafts={};samples={}
    with cf.ThreadPoolExecutor(max_workers=6) as pool:
        fs={pool.submit(curl,ROOT+'/product/'+s,'Browser',28):('draft',s) for s in DRAFTS}
        fs.update({pool.submit(curl,ROOT+'/product/'+s,'Browser',28):('sample',s) for s,_ in SAMPLE if (ROOT+'/product/'+s,'Browser') not in fixed})
        for f in cf.as_completed(fs):
            typ,slug=fs[f];(drafts if typ=='draft' else samples)[slug]=f.result()
    for s,_ in SAMPLE:
        if (ROOT+'/product/'+s,'Browser') in fixed:samples[s]=fixed[(ROOT+'/product/'+s,'Browser')]
    out=['# dyasse.com - live production SEO snapshot','',
         '**Captured:** '+now,
         '**Method:** REAL curl from a GitHub Actions Linux runner; redirects followed with -L and response bodies saved without running client-side JavaScript. Both User-Agents below are explicitly set with curl -A. HTTPS TLS verification enabled.',
         '**Browser User-Agent:** '+BT+UA['Browser']+BT,
         '**Googlebot User-Agent (simulated, not authenticated Google crawler IP):** '+BT+UA['Googlebot']+BT,
         '**Scope:** codebase checkout on isolated audit branch, live production HTML, and Supabase read-only totals fetched earlier in this same audit.',
         '', '## 1. Live HTTP Status, Redirect Chains & Response Headers','',
         'Every row is a separate curl request; each HTTP chain includes all status hops, and Location values are transcribed from the chain headers. Cloudflare ray values are request-specific. Missing header = dash.']
    rows=[]
    for u in ESSENTIAL:
        for a in UA:
            r=fixed[(u,a)];h=r['headers']
            rows.append([a,u,chain(r),hops(r),h.get('server'),h.get('cf-ray'),h.get('cf-mitigated'),
                         h.get('x-robots-tag'),h.get('content-type'),h.get('cache-control'),h.get('cf-cache-status')])
    table(out,['UA','URL','HTTP chain','Location targets','server','cf-ray','CF challenge','x-robots-tag','content-type','cache-control','cf-cache-status'],rows)
    failed=[(u,a,r['status'],r['error'][:180]) for (u,a),r in fixed.items() if r['exit']]
    if failed:out.extend(['','**Curl transport errors:** '+md(failed)])
    out.extend(['','## 2. Live '+BT+'robots.txt'+BT+' & '+BT+'sitemap.xml'+BT+' Audit','',
                '**FULL raw browser '+BT+'robots.txt'+BT+':**'])
    fence(out,'text',robots['body'])
    other_robots=fixed[(ROOT+'/robots.txt','Googlebot')]['body']
    if other_robots!=robots['body']:
        out.append('Googlebot robots.txt differs; FULL raw Googlebot text:');fence(out,'text',other_robots)
    else:out.append('Browser and Googlebot received byte-identical robots.txt contents.')
    out.extend(['','**Sitemap:** '+str(len(entries))+' URL elements; XML parse error = '+md(parse_error)+'.'])
    table(out,['Route class','Count'],[[k,v] for k,v in kinds.items()])
    out.extend(['','Lastmod present: '+str(sum(bool(v) for _,v in entries))+'; absent: '+str(sum(not v for _,v in entries))+'.',
                '', '**First 20 sitemap URLs in exact XML order:**'])
    table(out,['#','URL','lastmod'],[[i+1,u,last] for i,(u,last) in enumerate(entries[:20])])
    out.append('')
    for a in UA:
        rows=[x for x in sitemap_results if x['ua']==a]
        bad=[x for x in rows if x['status']!=200 or x['error'] or x['cf_mitigated']]
        no=[x for x in rows if 'noindex' in (str(x['robots'])+' '+str(x['xrobots'])).lower()]
        out.append('**Full sitemap crawl with '+a+':** '+str(len(rows))+' checked, '+str(sum(x['status']==200 for x in rows))+' HTTP 200, '+str(len(no))+' noindex, '+str(len(bad))+' non-200 / transport / WAF challenge anomalies.')
        if bad:table(out,['URL','status','robots','x-robots-tag','cf-mitigated','curl error'],[[x['url'],x['status'],x['robots'],x['xrobots'],x['cf_mitigated'],x['error'][:120]] for x in bad])
        if no:out.append('Noindex URLs: '+', '.join(x['url'] for x in no))
    out.extend(['','## 3. Raw SSR HTML Extraction (Page-by-Page)','',
                'HTML is from curl response bodies only; no browser JS. Main word count uses alphanumeric words in server-rendered main excluding nav, aside, footer, scripts, styles and SVG. All H1 and H2 includes footer headings.'])
    for path in PAGES:
        u=ROOT+path;rb=fixed[(u,'Browser')];rg=fixed[(u,'Googlebot')]
        p=parse(rb['body']);g=parse(rg['body'])
        out.extend(['','### '+('Homepage /' if path=='/' else path),'',
            '- HTTP: Browser '+str(rb['status'])+'; Googlebot '+str(rg['status']),
            '- Exact title ('+str(len(p['title']))+' characters): '+BT+md(p['title'])+BT,
            '- Exact meta description ('+str(len(p['description'] or ''))+' characters): '+BT+md(p['description'])+BT,
            '- Exact meta robots: '+BT+md(p['robots'])+BT,
            '- Exact canonical: '+BT+md(p['canonical'])+BT,
            '- Header logo raw element text: '+BT+md(p['logo_raw'])+BT+'; accessible aria-label: '+BT+md(p['logo_aria'])+BT,
            '- Main-content visible SSR words: '+str(p['mainwords']),
            '- Internal crawlable anchor count (main): '+str(p['internal'])+'; unique hrefs: '+str(p['distinct']),
            '- From our earlier Etsy shop: '+str(p['etsy_earlier'])+'; selected/cherry-picked Etsy reviews: '+str(p['curated'])+'; Coming soon in main: '+str(p['coming']),
            '- Image alt sample: '+('; '.join(BT+md(s)+BT for s in p['alts']) if p['alts'] else 'none'),
            '- ALL H1: '+('; '.join(BT+md(s)+BT for s in p['headings']['h1']) if p['headings']['h1'] else 'none'),
            '- ALL H2: '+('; '.join(BT+md(s)+BT for s in p['headings']['h2']) if p['headings']['h2'] else 'none'),
            '- SEO-field difference from Googlebot: '+(', '.join(k for k in ['title','description','robots','canonical','headings'] if p[k]!=g[k]) or 'none'),
            '- HTML SHA256: browser '+BT+hashlib.sha256(rb['body'].encode()).hexdigest()+BT+'; Googlebot '+BT+hashlib.sha256(rg['body'].encode()).hexdigest()+BT])
        if p['cominglinks']:out.append('- Coming soon links: '+', '.join(BT+md(x['text'][:95])+' -> '+md(x['href'])+BT for x in p['cominglinks']))
        out.extend(['','**FULL raw browser JSON-LD scripts ('+str(len(p['jsonld']))+'):**'])
        for i,block in enumerate(p['jsonld'],1):out.append('JSON-LD block '+str(i)+':');fence(out,'json',block)
        if p['jsonld']!=g['jsonld']:
            out.append('**Googlebot JSON-LD differs; FULL raw blocks:**')
            for i,block in enumerate(g['jsonld'],1):out.append('Googlebot block '+str(i)+':');fence(out,'json',block)
        else:out.append('Googlebot JSON-LD bytes match the browser response blocks.')
    out.extend(['','## 4. Full Catalog & Index-Hygiene Summary (Codebase / Data)','',
      'Supabase read-only SQL checked earlier in this audit: **177 total products; 172 published and QA verified; 5 unpublished drafts; 0 published-but-unverified**. The stored product columns contained 0 Etsy references. All 177 had regular price $6.99 and sale price $4.89 during the query.',
      'Sitemap product count by live curl: **'+str(kinds['products'])+'**. Product pages returned HTTP 200 with index-follow and without noindex for browser: **'+str(sum(x['ua']=='Browser' and '/product/' in urlsplit(x['url']).path and x['status']==200 and 'noindex' not in (str(x['robots'])+' '+str(x['xrobots'])).lower() for x in sitemap_results))+'**. Product pages with noindex in sitemap: **'+str(sum(x['ua']=='Browser' and '/product/' in urlsplit(x['url']).path and 'noindex' in (str(x['robots'])+' '+str(x['xrobots'])).lower() for x in sitemap_results))+'**. Technically indexable does not mean Google-indexed.',
      '', '**All unpublished draft slugs, fetched by curl at their product URLs:**'])
    table(out,['slug','HTTP','meta robots','canonical'],[[s,drafts[s]['status'],parse(drafts[s]['body'])['robots'],parse(drafts[s]['body'])['canonical']] for s in DRAFTS])
    out.extend(['','**Ten randomly selected published products:** Source selection: earlier Supabase query '+BT+'ORDER BY random() LIMIT 10'+BT+'. Exact title and meta / main text metrics come from raw production curl HTML; DB description word counts are from contemporaneous Supabase SQL, not the on-page visible main text.'])
    rows=[]
    for s,db_count in SAMPLE:
        r=samples[s];p=parse(r['body'])
        rows.append([s,r['status'],p['title'],len(p['title']),p['title'].count(','),words(p['description'] or ''),db_count,p['mainwords'],p['robots']])
    table(out,['slug','HTTP','exact title','title chars','commas','meta description words','DB description words','SSR main words','robots'],rows)
    out.extend(['','**Utility / filter / pagination routes:** meta robots and canonical refer to the final HTML response after curl redirects; an HTTP redirect itself has no indexable document.'])
    table(out,['path','HTTP chain','final HTML robots','final HTML canonical','x-robots-tag','Location hops'],[[s,chain(utility[s]),parse(utility[s]['body'])['robots'],parse(utility[s]['body'])['canonical'],utility[s]['headers'].get('x-robots-tag'),hops(utility[s])] for s in UTILITY])
    out.extend(['','## 5. Technical / Rendering Notes',''])
    package=json.loads(Path('package.json').read_text())
    mid=Path('middleware.ts').read_text()
    nc=Path('next.config.mjs').read_text()
    out.extend([
      '- Framework: Next.js '+str(package['dependencies'].get('next'))+' / React '+str(package['dependencies'].get('react'))+' App Router; based on checked-out repo '+BT+subprocess.run(['git','rev-parse','--short','HEAD'],text=True,capture_output=True).stdout.strip()+BT+'.',
      '- Hosting / CDN: Cloudflare evidenced by server / cf-ray headers; Vercel evidenced by x-vercel-id / x-vercel-cache headers. Product images use own domain and public Supabase bucket. Next.js image optimization disabled: '+str('unoptimized: true' in nc)+'.',
      '- Middleware: official-domain check in '+BT+'middleware.ts'+BT+'; preview/nonofficial hosts receive X-Robots-Tag noindex,nofollow, with disallow-all preview robots. Explicit Googlebot UA branch in source: '+str('googlebot' in mid.lower())+'. Full Cloudflare WAF policy cannot be inferred from middleware.',
      '- WAF/Cloudflare: compare all Browser/Googlebot HTTP chains and cf-mitigated in sections 1-2. Spoofed Googlebot UA is not an authenticated Google crawler; absence of challenge on test traffic cannot prove Google crawl access.',
      '- SSR: No client-side JavaScript was executed. Content visible only after client hydration is deliberately excluded. Header logo begins with a decorative d marked aria-hidden; accessible name is dyasse - home, but concatenated raw logo text may resemble ddyasse.',
      '- Observed content issue: /our-story is tested separately; the live About page is /about. Homepage Coming soon cards link to /studio-preview, a noindex page; changing their linking may reduce crawl of non-sellable preview content.',
      '- Index hygiene: Google indexing is not equivalent to the presence of an index,follow tag. Confirm index coverage and URL Inspection directly in GSC.',
      '', '**Recommended priority order:** verify UA-specific bot blocks if any, eliminate or make non-clickable Coming soon links to noindex preview, map legitimate old /our-story links to /about if applicable, review titles/unique product detail, and monitor Google indexing.',
      '', '**No website files, product prices, customer data, or deployments were modified by this audit.**'])
    path=Path('dyasse-live-seo-snapshot.md')
    path.write_text('\n'.join(out).rstrip()+'\n',encoding='utf-8')
    print(json.dumps({'report':str(path),'bytes':path.stat().st_size,'sitemap_total':len(entries),'types':kinds,
                      'browser_status_home':fixed[(ROOT+'/','Browser')]['status'],
                      'googlebot_status_home':fixed[(ROOT+'/','Googlebot')]['status'],
                      'sitemap_non200':sum(x['status']!=200 for x in sitemap_results)},indent=2))
if __name__=='__main__':main()
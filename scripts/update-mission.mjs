import { mkdir, writeFile } from 'node:fs/promises';

const owner = 'alinikan';
const token = process.env.GITHUB_TOKEN || '';
const escapeXml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
const short = (value, limit=28) => {const text=String(value||'');return text.length>limit?text.slice(0,limit-1)+'…':text;};

async function collectRepos() {
  const repos=[];
  for(let page=1;page<=5;page++){
    const url=new URL(`https://api.github.com/users/${owner}/repos`);
    url.searchParams.set('per_page','100');
    url.searchParams.set('page',String(page));
    url.searchParams.set('sort','pushed');
    url.searchParams.set('direction','desc');
    const res=await fetch(url,{
      signal:AbortSignal.timeout(12000),
      headers:{Accept:'application/vnd.github+json','User-Agent':'ALI-OS-profile-telemetry',...(token?{Authorization:`Bearer ${token}`}:{})}
    });
    if(!res.ok)throw Error('GitHub repository API returned HTTP '+res.status);
    const pageData=await res.json();
    if(!Array.isArray(pageData))throw Error('Invalid GitHub response');
    repos.push(...pageData.filter(r=>r?.owner?.login===owner&&r?.private===false&&!r?.fork));
    if(pageData.length<100)break;
  }
  return repos;
}

const data=await collectRepos();
if(data.length===0)throw Error('No public original repositories found; preserving previous cards');
const active=data.filter(r=>!r.archived&&r.name!==owner).sort((a,b)=>Date.parse(b.pushed_at||0)-Date.parse(a.pushed_at||0));
const stars=data.reduce((n,r)=>n+Math.max(0,Number(r.stargazers_count)||0),0);
const xp=data.length*100+stars*30; // Fun score, NOT assessed coding skill.
const level=1+Math.floor(xp/500);
const progress=xp%500;
const lastUpdated=new Date().toISOString().slice(0,10);

const missionRows=active.slice(0,3).map((r,i)=>{
  const name=escapeXml(short(r.name,37));const date=String(r.pushed_at||'').slice(0,10)||'unknown';
  const y=97+i*56;
  return `<circle cx="37" cy="${y-6}" r="5" fill="${['#67E8F9','#C4B5FD','#5EEAD4'][i]}"/><text x="55" y="${y}" fill="#EBF2FF" font-family="monospace" font-size="16">${name}</text><text x="55" y="${y+21}" fill="#91AACF" font-family="monospace" font-size="11">Last pushed: ${escapeXml(date)}</text>`;
}).join('');
const mission=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 295" role="img" aria-labelledby="title desc"><title id="title">Recent public builds</title><desc id="desc">Most recently pushed public repositories, not a subjective current project priority. Refreshed ${lastUpdated}.</desc><rect width="570" height="295" rx="14" fill="#10182F"/><rect x="10" y="10" width="550" height="275" rx="11" stroke="#6275B1" fill="none" opacity=".55"/><text x="27" y="38" fill="#67E8F9" font-family="monospace" font-weight="bold" font-size="16">LATEST PUBLIC BUILD SIGNALS</text><text x="28" y="56" fill="#9DABD1" font-family="monospace" font-size="11">GitHub activity · sorted by recent push</text>${missionRows}<text x="27" y="275" fill="#798FB9" font-family="monospace" font-size="10">LAST REFRESH: ${lastUpdated} UTC</text></svg>`;

const width=Math.round(463*progress/500);
const xpSvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 295" role="img" aria-labelledby="title desc"><title id="title">ALI.OS developer XP level ${level}</title><desc id="desc">Just-for-fun score: 100 XP per public original repository and 30 XP per public star. Current XP ${xp}, level ${level}. Not a rating of engineering skill.</desc><rect width="570" height="295" rx="14" fill="#10182F"/><rect x="10" y="10" width="550" height="275" rx="11" stroke="#6275B1" fill="none" opacity=".55"/><text x="27" y="39" fill="#C4B5FD" font-family="monospace" font-weight="bold" font-size="16">DEVELOPER XP // ACHIEVEMENT ENGINE</text><text x="28" y="112" fill="#EDE9FE" font-family="monospace" font-size="44" font-weight="bold">LVL ${level}</text><text x="28" y="144" fill="#67E8F9" font-family="monospace" font-size="15">TOTAL XP: ${xp}</text><rect x="27" y="168" width="463" height="17" rx="8" fill="#2A3152"/><rect x="27" y="168" width="${width}" height="17" rx="8" fill="#9F8AF9"/><text x="28" y="207" fill="#B5C5E8" font-family="monospace" font-size="12">${progress} / 500 XP to the next level</text><text x="28" y="235" fill="#95A6C9" font-family="monospace" font-size="11">${data.length} PUBLIC REPOS × 100  +  ${stars} STARS × 30</text><text x="28" y="265" fill="#798FB9" font-family="monospace" font-size="10">FOR FUN ONLY · NOT A MEASURE OF SKILL · ${lastUpdated}</text></svg>`;

await mkdir('generated',{recursive:true});
await Promise.all([
 writeFile('generated/mission.svg',mission,'utf8'),
 writeFile('generated/developer-xp.svg',xpSvg,'utf8')
]);
console.log(`Generated latest-public-build signals and playful XP: ${data.length} repos, ${stars} stars, level ${level}.`);

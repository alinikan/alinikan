import { writeFile, mkdir } from 'node:fs/promises';

const destination = new URL('../site/now-playing.json', import.meta.url);
const cardDestination = new URL('../generated/now-playing.svg', import.meta.url);
const xml = value => String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const singleLine = (value,limit=44) => {const text=String(value??'').replace(/[\x00-\x1f\x7f]/g,' ').trim();return text.length>limit?text.slice(0,limit-1)+'…':text;};
const disable = () => ({ enabled: false, track: null, artist: null, nowPlaying: false, updatedAt: null, url: null });
const username = (process.env.LASTFM_USERNAME || '').trim();
const apiKey = (process.env.LASTFM_API_KEY || '').trim();

let record = disable();
if (username && apiKey) {
  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.searchParams.set('method', 'user.getrecenttracks');
    url.searchParams.set('user', username);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', '1');

    const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { 'User-Agent': 'ALI.OS-Profile/1.0 (https://github.com/alinikan/alinikan)' } });
    if (!response.ok) throw Error('Last.fm responded with HTTP ' + response.status);
    const data = await response.json();
    const input = data?.recenttracks?.track;
    const track = Array.isArray(input) ? input[0] : input;
    const title = typeof track?.name === 'string' ? track.name.trim().slice(0, 120) : '';
    const artist = typeof track?.artist?.['#text'] === 'string' ? track.artist['#text'].trim().slice(0, 100) : '';
    if (title && artist) {
      const link = typeof track.url === 'string' && /^https:\/\/www\.last\.fm\/music\//.test(track.url) ? track.url : null;
      record = {
        enabled: true,
        track: title,
        artist,
        nowPlaying: track?.['@attr']?.nowplaying === 'true',
        updatedAt: new Date().toISOString(),
        url: link
      };
    }
  } catch (error) {
    // Do not publish old listening information when the upstream service errors.
    console.error('Unable to update soundtrack station: ' + String(error?.message || error));
    process.exitCode = 1;
  }
}

if (process.exitCode === 1) process.exit(1); // Preserve last-known-good file on transient failure.
await mkdir(new URL('../site/', import.meta.url), {recursive:true});
await writeFile(destination, JSON.stringify(record, null, 2) + '\n', 'utf8');
await mkdir(new URL('../generated/', import.meta.url), {recursive:true});
const heading=record.enabled?(record.nowPlaying?'NOW PLAYING · LAST.FM':'RECENTLY PLAYED · LAST.FM'):'SOUNDTRACK STATION';
const track=record.enabled?singleLine(record.track):'NOT CONNECTED';
const artist=record.enabled?singleLine(record.artist,58):'Optional listening feed · disabled by default';
const card=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 165" role="img" aria-label="${xml(heading)}: ${xml(track)} by ${xml(artist)}"><rect width="800" height="165" rx="14" fill="#10182F"/><rect x="9" y="9" width="782" height="147" rx="11" fill="none" stroke="#635E99"/><circle cx="65" cy="82" r="34" fill="#252A56" stroke="#A78BFA" stroke-width="1.5"/><text x="65" y="94" fill="#A78BFA" font-size="37" text-anchor="middle">♫</text><text x="123" y="45" fill="#67E8F9" font-family="monospace" font-size="14" letter-spacing="2">${xml(heading)}</text><text x="123" y="88" fill="#F0EDFF" font-family="monospace" font-size="25" font-weight="bold">${xml(track)}</text><text x="123" y="119" fill="#AFBCE1" font-family="monospace" font-size="16">${xml(artist)}</text><text x="123" y="147" fill="#7E90B4" font-family="monospace" font-size="11">${record.enabled?'PUBLIC, OPTED-IN LISTENING ACTIVITY':'NO PUBLIC LISTENING DATA SHARED'}</text></svg>`;
await writeFile(cardDestination,card,'utf8');
console.log('Soundtrack station: ' + (record.enabled ? 'updated' : 'disabled'));

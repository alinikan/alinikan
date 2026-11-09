import { writeFile, mkdir } from 'node:fs/promises';

const destination = new URL('../site/now-playing.json', import.meta.url);
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

    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
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
console.log('Soundtrack station: ' + (record.enabled ? 'updated' : 'disabled'));

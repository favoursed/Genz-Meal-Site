/**
 * Extracts the 11-character YouTube video ID from various YouTube URL formats.
 * Supports standard watch, short URLs, embeds, shorts, mobile links, and extra query params.
 * 
 * @param {string} url
 * @returns {string|null}
 */
export function getYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);

  return match && match[1] ? match[1] : null;
}

/**
 * Builds an embeddable YouTube URL for iframes with optimal options.
 * 
 * @param {string} url
 * @param {Object} options
 * @param {boolean} [options.autoplay=false]
 * @param {boolean} [options.mute=false]
 * @returns {string|null}
 */
export function getYouTubeEmbedUrl(url, { autoplay = false, mute = false } = {}) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1'
  });

  if (autoplay) {
    params.set('autoplay', '1');
  }

  if (mute) {
    params.set('mute', '1');
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Builds a fast, muted, control-less YouTube embed URL specifically for card hover previews.
 * 
 * @param {string} url
 * @param {Object} [options]
 * @param {number} [options.start=0]
 * @returns {string|null}
 */
export function getYouTubePreviewUrl(url, { start = 0, mute = false } = {}) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: '1',
    mute: mute ? '1' : '0',
    controls: '0',
    disablekb: '1',
    enablejsapi: '1',
    fs: '0',
    iv_load_policy: '3',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
    showinfo: '0'
  });

  if (start > 0) {
    params.set('start', String(start));
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}


import { ref, computed } from 'vue';
import { getYouTubeEmbedUrl } from '../utils/youtube';

const isOpen = ref(false);
const videoUrl = ref('');
const videoTitle = ref('');
const mealId = ref(null);

const embedUrl = computed(() => {
  if (!videoUrl.value) return '';
  return getYouTubeEmbedUrl(videoUrl.value, { autoplay: true }) || '';
});

export function useVideoModal() {
  function openVideo({ url, title = 'Recipe Video', id = null } = {}) {
    if (!url) return;
    videoUrl.value = url;
    videoTitle.value = title || 'Recipe Video';
    mealId.value = id;
    isOpen.value = true;

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  function closeVideo() {
    isOpen.value = false;
    // Clear video URL to instantly terminate video & audio playback
    videoUrl.value = '';
    videoTitle.value = '';
    mealId.value = null;

    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  return {
    isOpen,
    videoUrl,
    videoTitle,
    mealId,
    embedUrl,
    openVideo,
    closeVideo
  };
}

import { ref } from 'vue';

// Global audio preference across all cards (default to unmuted: sound enabled)
const isAudioMuted = ref(false);

export function useSoundPreference() {
  function toggleAudio() {
    isAudioMuted.value = !isAudioMuted.value;
  }

  function setAudioMuted(val) {
    isAudioMuted.value = !!val;
  }

  return {
    isAudioMuted,
    toggleAudio,
    setAudioMuted
  };
}

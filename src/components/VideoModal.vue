<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        @keydown.esc="closeVideo"
        tabindex="-1"
        ref="modalOverlay"
      >
        <!-- Backdrop Blur -->
        <div
          class="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          @click="closeVideo"
          aria-hidden="true"
        ></div>

        <!-- Modal Dialog Box -->
        <div
          class="relative w-full max-w-4xl bg-[#01472e] text-[#fefae0] rounded-2xl sm:rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-[#ccd5ae]/20 overflow-hidden z-10 transition-all transform flex flex-col my-auto"
          @click.stop
        >
          <!-- Header Bar -->
          <div class="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-[#ccd5ae]/15 bg-[#01472e]/90">
            <div class="flex items-center gap-2 sm:gap-3 pr-2 min-w-0">
              <span class="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] bg-[#e9edc9] text-[#01472e] shrink-0">
                <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-pulse"></span>
                Video
              </span>
              <h3
                id="video-modal-title"
                class="font-anton text-base sm:text-2xl tracking-wide uppercase truncate text-[#fefae0]"
              >
                {{ videoTitle }}
              </h3>
            </div>

            <!-- Close Button -->
            <button
              type="button"
              @click="closeVideo"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#fefae0]/10 hover:bg-[#fefae0]/20 text-[#fefae0] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#ccd5ae]"
              aria-label="Close video modal"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <!-- Video Player Body -->
          <div class="p-2 sm:p-6 bg-black/40">
            <div class="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-inner">
              <iframe
                v-if="embedUrl"
                :src="embedUrl"
                :title="videoTitle"
                class="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <div v-else class="flex items-center justify-center h-full text-[#ccd5ae]/70 text-xs sm:text-sm font-medium">
                Unable to load video stream.
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-4 sm:px-8 py-3 sm:py-4 bg-[#01472e] border-t border-[#ccd5ae]/15 flex items-center justify-between gap-2.5">
            <p class="text-[11px] uppercase tracking-[0.15em] text-[#ccd5ae]/80 font-bold hidden sm:block">
              Watching directly on Forkful
            </p>

            <div class="flex items-center gap-2 sm:gap-3 ml-auto w-full sm:w-auto justify-end">
              <router-link
                v-if="mealId"
                :to="{ name: 'mealDetails', params: { id: mealId } }"
                @click="closeVideo"
                class="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#ccd5ae] text-[#01472e] text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] hover:bg-[#e9edc9] transition-all hover:scale-105 active:scale-95 shadow-sm whitespace-nowrap"
              >
                View Full Recipe
              </router-link>
              <button
                type="button"
                @click="closeVideo"
                class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#ccd5ae]/30 text-[#fefae0] text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] hover:bg-[#fefae0]/10 transition-colors whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useVideoModal } from '../composables/useVideoModal';

const { isOpen, videoTitle, mealId, embedUrl, closeVideo } = useVideoModal();
const modalOverlay = ref(null);

function handleGlobalKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeVideo();
  }
}

watch(isOpen, async (opened) => {
  if (opened) {
    await nextTick();
    modalOverlay.value?.focus();
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown);
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>

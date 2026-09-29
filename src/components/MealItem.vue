<template>
  <div
    class="bg-white rounded-3xl border border-[#01472e]/10 shadow-[0_20px_40px_-15px_rgba(1,71,46,0.12)] hover:shadow-[0_25px_50px_-12px_rgba(1,71,46,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
  >
    <!-- Recipe Thumbnail Area with 10s Video Hover Preview -->
    <div
      class="relative overflow-hidden bg-[#01472e] aspect-[16/10] block select-none group/thumb"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Clickable link to Meal Details -->
      <router-link
        :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
        class="absolute inset-0 z-0 block w-full h-full"
        :title="meal.strMeal"
      >
        <!-- Static Recipe Thumbnail Image -->
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-full object-cover transition-all duration-500"
          :class="{
            'opacity-0 scale-105': showPreview,
            'opacity-100 group-hover/thumb:scale-105': !showPreview
          }"
          loading="lazy"
        />
      </router-link>

      <!-- 10-Second YouTube Video Preview Clip -->
      <div
        v-if="showPreview && previewUrl"
        class="absolute inset-0 z-10 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-300 bg-black"
      >
        <iframe
          ref="iframeRef"
          :src="previewUrl"
          :title="meal.strMeal + ' preview'"
          class="w-full h-full scale-[1.16] border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          @load="handleIframeLoaded"
        ></iframe>
      </div>

      <!-- Preview HUD Overlays (Countdown Badge, Sound Toggle & Progress Bar) -->
      <div
        v-if="showPreview"
        class="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-3 bg-gradient-to-b from-black/50 via-transparent to-black/60"
      >
        <!-- Top Status Bar with Live Indicator, Audio Toggle & Countdown -->
        <div class="flex items-center justify-between gap-2">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-[#01472e]/90 backdrop-blur-md text-[#fefae0] border border-[#ccd5ae]/30 shadow-md">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            10s Clip
          </span>

          <div class="flex items-center gap-2 pointer-events-auto">
            <!-- Audio Toggle Button (Sound On / Muted) -->
            <button
              type="button"
              @click.stop.prevent="handleToggleSound"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 hover:bg-black/90 text-[#fefae0] border border-white/20 backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer"
              :title="isAudioMuted ? 'Click to enable sound' : 'Click to mute sound'"
            >
              <svg v-if="!isAudioMuted" class="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <svg v-else class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
              <span>{{ isAudioMuted ? 'Muted' : 'Sound' }}</span>
            </button>

            <!-- Remaining Time Countdown -->
            <span class="text-[10px] font-mono font-bold text-[#fefae0] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
              {{ remainingSeconds }}s
            </span>
          </div>
        </div>

        <!-- 10-Second Progress Bar -->
        <div class="w-full bg-white/20 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            class="bg-gradient-to-r from-amber-400 to-red-500 h-full transition-all duration-100 ease-linear rounded-full shadow-sm"
            :style="{ width: `${previewProgress}%` }"
          ></div>
        </div>
      </div>

      <!-- Hover / Mobile Touch Prompt Pill -->
      <div
        v-if="meal.strYoutube && !showPreview"
        class="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 transition-opacity duration-200"
      >
        <button
          type="button"
          @click.stop.prevent="toggleMobilePreview"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#01472e]/85 backdrop-blur-md text-[#fefae0] border border-[#ccd5ae]/30 shadow-sm opacity-90 sm:opacity-0 sm:group-hover/thumb:opacity-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Play 10-second video preview"
        >
          <svg class="w-2.5 h-2.5 fill-current text-red-400 shrink-0" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          <span class="sm:hidden">10s Clip ▶</span>
          <span class="hidden sm:inline">Hover for 10s Clip</span>
        </button>
      </div>
    </div>

    <!-- Recipe Content & Action Footer -->
    <div class="p-4 sm:p-6 flex flex-col flex-1">
      <h3 class="font-bold text-lg sm:text-xl text-[#01472e] mb-2 leading-snug line-clamp-1">{{ meal.strMeal }}</h3>
      <p class="mb-4 sm:mb-5 text-[#01472e]/75 text-xs sm:text-sm leading-relaxed flex-1">
        {{ $filters.truncateWords(meal.strInstructions, 18) }}
      </p>
      <div class="flex items-center justify-between gap-2 pt-3 border-t border-[#01472e]/10">
        <YouTubeButton
          v-if="meal.strYoutube"
          :href="meal.strYoutube"
          :title="meal.strMeal"
          :mealId="meal.idMeal"
        />
        <span v-else class="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#01472e]/40 font-bold">No video</span>
        <router-link
          :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#01472e]/30 text-[#01472e] hover:bg-[#01472e] hover:text-[#fefae0] text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-colors whitespace-nowrap shrink-0 text-center"
        >
          View Recipe
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import YouTubeButton from './YouTubeButton.vue';
import { getYouTubePreviewUrl } from '../utils/youtube';
import { useSoundPreference } from '../composables/useSoundPreference';

const props = defineProps({
  meal: {
    required: true,
    type: Object
  }
});

const iframeRef = ref(null);
const isHovering = ref(false);
const showPreview = ref(false);
const previewProgress = ref(0);

const { isAudioMuted, toggleAudio } = useSoundPreference();

let hoverTimeout = null;
let endTimeout = null;
let progressInterval = null;

const previewUrl = computed(() => {
  if (!props.meal?.strYoutube || !showPreview.value) return null;
  return getYouTubePreviewUrl(props.meal.strYoutube, { mute: isAudioMuted.value });
});

const remainingSeconds = computed(() => {
  return Math.max(1, Math.ceil((100 - previewProgress.value) / 10));
});

function handleIframeLoaded() {
  if (iframeRef.value?.contentWindow) {
    if (!isAudioMuted.value) {
      iframeRef.value.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
        '*'
      );
      iframeRef.value.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
        '*'
      );
    }
  }
}

function handleToggleSound() {
  toggleAudio();
  if (iframeRef.value?.contentWindow) {
    const cmd = isAudioMuted.value ? 'mute' : 'unMute';
    iframeRef.value.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: cmd, args: [] }),
      '*'
    );
    if (!isAudioMuted.value) {
      iframeRef.value.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
        '*'
      );
    }
  }
}

function startPreview() {
  clearTimers();
  showPreview.value = true;
  previewProgress.value = 0;

  const startTime = Date.now();
  const duration = 10000; // 10 seconds

  progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    previewProgress.value = Math.min(100, (elapsed / duration) * 100);

    if (elapsed >= duration) {
      clearInterval(progressInterval);
    }
  }, 100);

  endTimeout = setTimeout(() => {
    stopPreview();
  }, duration);
}

function toggleMobilePreview() {
  if (showPreview.value) {
    stopPreview();
  } else {
    startPreview();
  }
}

function handleMouseEnter() {
  if (!props.meal?.strYoutube) return;

  clearTimers();
  isHovering.value = true;

  // 200ms hover intent delay to prevent triggering on fast mouse swipes
  hoverTimeout = setTimeout(() => {
    if (!isHovering.value) return;
    startPreview();
  }, 200);
}

function handleMouseLeave() {
  clearTimers();
  isHovering.value = false;
  showPreview.value = false;
  previewProgress.value = 0;
}

function stopPreview() {
  clearTimers();
  showPreview.value = false;
  previewProgress.value = 0;
}

function clearTimers() {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  if (endTimeout) {
    clearTimeout(endTimeout);
    endTimeout = null;
  }
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

onUnmounted(() => {
  clearTimers();
});
</script>
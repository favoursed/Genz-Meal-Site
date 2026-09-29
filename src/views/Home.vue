<template>
  <div>
    <!-- Hero Section -->
    <section class="min-h-[85vh] sm:min-h-screen bg-[#ccd5ae] flex flex-col justify-center items-center relative overflow-hidden px-6 sm:px-10 pt-16 pb-24">
      <div class="hero-text font-anton text-[#01472e] text-center select-none z-10">
        <div class="letter-reveal flex justify-center">
          <span style="animation-delay: 0.05s">F</span>
          <span style="animation-delay: 0.1s">O</span>
          <span style="animation-delay: 0.15s">R</span>
          <span style="animation-delay: 0.2s">K</span>
          <span style="animation-delay: 0.25s">F</span>
          <span style="animation-delay: 0.3s">U</span>
          <span style="animation-delay: 0.35s">L</span>
        </div>
      </div>

      <!-- Floating Ingredients -->
      <div class="hidden sm:block absolute top-[12%] left-[6%] w-[16vw] max-w-[220px] aspect-[4/5] float-item z-20">
        <img
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800"
          alt="Fresh Harvest"
          class="w-full h-full object-cover rounded-float shadow-forest"
        />
      </div>
      <div
        class="hidden sm:block absolute bottom-[14%] right-[6%] w-[18vw] max-w-[260px] aspect-square float-item z-20"
        style="animation-delay: -3.5s"
      >
        <img
          src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&q=80&w=800"
          alt="Culinary Spices"
          class="w-full h-full object-cover rounded-float shadow-forest"
        />
      </div>

      <!-- Hero Bottom Bar -->
      <div class="w-full max-w-7xl mx-auto mt-12 sm:mt-20 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 z-30">
        <div class="max-w-xs text-center sm:text-left reveal-item">
          <p class="utility-label mb-2 text-[#01472e]">Our Philosophy</p>
          <p class="text-sm leading-relaxed text-[#01472e]/85">
            Artisanal cooking techniques meet seasonal harvest. Curated for the modern table.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            :to="{ name: 'byName' }"
            class="bg-[#01472e] text-[#fefae0] px-8 py-4 rounded-full utility-label text-xs hover:scale-105 active:scale-95 transition-all shadow-forest"
          >
            Explore Recipes
          </router-link>
          <a
            href="#featured-series"
            class="border border-[#01472e]/30 bg-white/40 backdrop-blur-sm text-[#01472e] px-8 py-4 rounded-full utility-label text-xs hover:bg-[#01472e] hover:text-[#fefae0] transition-all"
          >
            Featured Series ↓
          </a>
        </div>

        <div class="text-center sm:text-right reveal-item">
          <p class="utility-label mb-2 text-[#01472e]">Origin</p>
          <p class="text-sm font-medium text-[#01472e]/85">Harvested with Care</p>
          <p class="text-sm font-medium text-[#01472e]/85">Curated for Food Lovers</p>
        </div>
      </div>
    </section>

    <!-- Featured Series / Recipe Grid Section -->
    <section id="featured-series" class="bg-[#e9edc9] rounded-section -mt-16 pt-28 sm:pt-36 pb-32 sm:pb-40 px-6 sm:px-12 relative z-40">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6 reveal-item">
          <div>
            <p class="utility-label text-xs mb-3 text-[#a3b18a]">Seasonal Selections</p>
            <h2 class="section-title font-anton text-[#01472e]">Featured<br>Series</h2>
          </div>
          <router-link
            :to="{ name: 'byName' }"
            class="w-32 h-32 sm:w-40 sm:h-40 bg-[#01472e] text-[#fefae0] rounded-full flex items-center justify-center flex-col utility-label text-center group transition-transform hover:scale-110 shadow-forest"
          >
            <span>Explore<br>Recipes</span>
            <span class="mt-2 text-xl group-hover:translate-x-1 transition-transform">→</span>
          </router-link>
        </div>

        <!-- Meals component -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-[#01472e]/60 font-anton text-2xl uppercase tracking-widest gap-3">
          <div class="w-10 h-10 border-4 border-[#01472e]/20 border-t-[#01472e] rounded-full animate-spin"></div>
          <span>Loading Seasonal Harvest...</span>
        </div>
        <Meals v-else :meals="meals" />
      </div>
    </section>

    <!-- Video Masterclass Callout Section -->
    <section class="px-6 sm:px-12 py-24 sm:py-36 bg-[#fefae0] flex items-center justify-center">
      <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center">
        <!-- Interactive Hover-To-Play Masterclass Card -->
        <div
          class="rounded-card overflow-hidden shadow-forest relative reveal-item group aspect-[4/3] bg-[#01472e] cursor-pointer select-none"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @click="openMasterclassVideo"
          role="button"
          tabindex="0"
          @keydown.enter="openMasterclassVideo"
          @keydown.space.prevent="openMasterclassVideo"
          aria-label="Cooking Masterclass (Hover to play, click for full video with sound)"
        >
          <!-- Video element that plays on hover -->
          <video
            ref="videoRef"
            class="w-full h-full object-cover transition-all duration-700"
            :class="{ 'opacity-100 scale-105': isHovered, 'opacity-0 scale-100': !isHovered }"
            loop
            muted
            playsinline
            preload="auto"
          >
            <source src="/videos/masterclass.webm" type="video/webm" />
            <source src="/videos/masterclass.mp4" type="video/mp4" />
          </video>

          <!-- Poster Image (shown when not hovering, smooth crossfade) -->
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
            alt="Cooking Masterclass"
            class="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none"
            :class="{ 'opacity-0 scale-105': isHovered, 'opacity-100 scale-100': !isHovered }"
          />

          <!-- Overlay Header: Shows 'Playing on Hover' & Sound Toggle -->
          <div
            class="absolute top-5 inset-x-5 flex items-center justify-between transition-all duration-300 pointer-events-none"
            :class="{ 'opacity-100 translate-y-0': isHovered, 'opacity-0 -translate-y-2': !isHovered }"
          >
            <span class="inline-flex items-center gap-2 bg-[#01472e]/90 text-[#fefae0] backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg border border-[#ccd5ae]/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Playing on Hover
            </span>

            <button
              type="button"
              @click.stop="handleToggleSound"
              class="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 hover:bg-black/90 text-[#fefae0] border border-white/20 backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer"
              :title="isAudioMuted ? 'Click to enable sound' : 'Click to mute sound'"
            >
              <svg v-if="!isAudioMuted" class="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <svg v-else class="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
              <span>{{ isAudioMuted ? 'Muted' : 'Sound On' }}</span>
            </button>
          </div>

          <!-- Frosted Glass Play Button in Center -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
            :class="{ 'opacity-0 scale-90': isHovered, 'opacity-100 scale-100 group-hover:scale-110': !isHovered }"
          >
            <div class="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg">
              <svg class="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <!-- Bottom Prompt Overlay: Click for Full Video with Sound -->
          <div
            class="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex items-center justify-between transition-all duration-300 pointer-events-none"
            :class="{ 'opacity-100 translate-y-0': isHovered, 'opacity-0 translate-y-2': !isHovered }"
          >
            <span class="bg-black/60 backdrop-blur-md text-[#fefae0] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full border border-white/20 shadow-md">
              Click for full video with sound ↗
            </span>
          </div>
        </div>
        <div class="reveal-item">
          <p class="utility-label text-xs mb-4 text-[#a3b18a]">Masterclass</p>
          <h2 class="font-anton text-5xl sm:text-7xl mb-6 text-[#01472e] leading-[0.9] uppercase">
            Learn the art of slow cooking.
          </h2>
          <p class="text-base sm:text-lg mb-8 text-[#01472e]/80 leading-relaxed">
            Discover the relationship between time, aroma, and harvest in everyday culinary practice. Master foundational kitchen techniques with step-by-step guidance.
          </p>
          <router-link
            :to="{ name: 'byName' }"
            class="inline-flex items-center gap-2 border-b-2 border-[#01472e] pb-2 utility-label text-xs text-[#01472e] hover:opacity-70 transition-opacity"
          >
            <span>Explore All Recipes</span>
            <span>→</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quick Navigation Callout -->
    <section class="bg-[#ccd5ae] py-20 px-6 sm:px-12 rounded-section -mb-8 relative z-20">
      <div class="max-w-6xl mx-auto text-center">
        <p class="utility-label text-xs mb-4 text-[#01472e]/70">Pantry & Archive</p>
        <h2 class="font-anton text-4xl sm:text-6xl text-[#01472e] uppercase mb-8">Ready to start cooking?</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            :to="{ name: 'byName' }"
            class="px-8 py-4 rounded-full bg-[#01472e] text-[#fefae0] utility-label text-xs hover:scale-105 transition-all shadow-sm"
          >
            Search by Name
          </router-link>
          <router-link
            :to="{ name: 'byLetter' }"
            class="px-8 py-4 rounded-full bg-white text-[#01472e] border border-[#01472e]/20 utility-label text-xs hover:bg-[#01472e] hover:text-[#fefae0] transition-all shadow-sm"
          >
            Browse by Letter
          </router-link>
          <router-link
            :to="{ name: 'ingredients' }"
            class="px-8 py-4 rounded-full bg-white text-[#01472e] border border-[#01472e]/20 utility-label text-xs hover:bg-[#01472e] hover:text-[#fefae0] transition-all shadow-sm"
          >
            Explore Ingredients
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Meals from "../components/Meals.vue";
import axiosClient from "../axiosClient.js";
import { useVideoModal } from "../composables/useVideoModal";
import { useSoundPreference } from "../composables/useSoundPreference";

const meals = ref([]);
const loading = ref(true);
const videoRef = ref(null);
const isHovered = ref(false);
const { openVideo } = useVideoModal();
const { isAudioMuted, toggleAudio } = useSoundPreference();

function handleToggleSound() {
  toggleAudio();
  if (videoRef.value) {
    videoRef.value.muted = isAudioMuted.value;
  }
}

function handleMouseEnter() {
  isHovered.value = true;
  if (videoRef.value) {
    videoRef.value.muted = isAudioMuted.value;
    videoRef.value.play().catch((err) => {
      // Ignore autoplay interruption warnings if user quickly moves cursor
      console.warn("Video hover playback interrupted:", err);
    });
  }
}

function handleMouseLeave() {
  isHovered.value = false;
  if (videoRef.value) {
    videoRef.value.pause();
  }
}

function openMasterclassVideo() {
  openVideo({
    url: "https://www.youtube.com/watch?v=kYIflz9Qj2k",
    title: "Culinary Slow Cooking Masterclass"
  });
}

onMounted(async () => {
  try {
    const requests = Array.from({ length: 6 }, () => axiosClient.get("random.php"));
    const responses = await Promise.all(requests);
    meals.value = responses.map((res) => res.data?.meals?.[0]).filter(Boolean);
  } catch (error) {
    console.error("Failed to load random meals", error);
  } finally {
    loading.value = false;
  }
});
</script>
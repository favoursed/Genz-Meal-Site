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
        <div class="rounded-card overflow-hidden shadow-forest relative reveal-item group aspect-[4/3] bg-[#d4d9b9]">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
            alt="Cooking Masterclass"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <router-link
            :to="{ name: 'byName' }"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 hover:scale-110 transition-transform shadow-lg"
          >
            <svg class="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </router-link>
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

const meals = ref([]);
const loading = ref(true);

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
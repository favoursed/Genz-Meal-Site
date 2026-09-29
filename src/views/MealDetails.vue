<template>
  <div class="max-w-[900px] mx-auto p-4 sm:p-8">
    <p class="uppercase tracking-[0.3em] text-[0.65rem] sm:text-[0.7rem] font-bold text-[#a3b18a] mb-1.5 sm:mb-2">Recipe Detail</p>
    <h1 class="text-3xl sm:text-6xl font-anton text-[#01472e] mb-4 sm:mb-6 tracking-tight leading-tight uppercase">{{ meal.strMeal }}</h1>
    
    <div class="rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-forest border border-[#01472e]/10 bg-[#d4d9b9] mb-6 sm:mb-8 aspect-video">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-full object-cover">
    </div>

    <!-- Metadata Badges -->
    <div class="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
      <div v-if="meal.strCategory" class="inline-flex items-center gap-1.5 sm:gap-2 bg-[#01472e] text-[#fefae0] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-sm">
        <span class="opacity-75 font-normal">Category:</span>
        <span>{{ meal.strCategory }}</span>
      </div>
      <div v-if="meal.strArea" class="inline-flex items-center gap-1.5 sm:gap-2 bg-[#a3b18a] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-sm">
        <span class="opacity-75 font-normal">Origin:</span>
        <span>{{ meal.strArea }}</span>
      </div>
      <div v-if="meal.strTags" class="inline-flex items-center gap-1.5 sm:gap-2 bg-[#ccd5ae] text-[#01472e] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-sm">
        <span class="opacity-75 font-normal">Tags:</span>
        <span>{{ meal.strTags }}</span>
      </div>
    </div>

    <!-- Instructions -->
    <div class="my-6 sm:my-8 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#01472e]/10 shadow-forest text-[#01472e]">
      <h2 class="font-anton text-2xl sm:text-3xl text-[#01472e] mb-3 sm:mb-4 uppercase tracking-wide">Preparation & Method</h2>
      <div class="whitespace-pre-line text-sm sm:text-base leading-relaxed opacity-90">
        {{ meal.strInstructions }}
      </div>
    </div>

    <!-- Ingredients & Measures -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 my-6 sm:my-8">
      <div class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#01472e]/10 shadow-forest">
        <h2 class="font-anton text-xl sm:text-2xl text-[#01472e] mb-3 sm:mb-4 pb-2 border-b-2 border-[#ccd5ae] uppercase tracking-wide">Ingredients</h2>
        <ul class="space-y-2 sm:space-y-2.5">
          <template v-for="(el, ind) of new Array(20)" :key="ind">
            <li v-if="meal[`strIngredient${ind + 1}`]" class="text-xs sm:text-sm font-medium text-[#01472e] flex items-center gap-2.5">
              <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#e9edc9] text-[#01472e] text-[10px] sm:text-xs flex items-center justify-center font-bold shrink-0">{{ ind + 1 }}</span>
              <span>{{ meal[`strIngredient${ind + 1}`] }}</span>
            </li>
          </template>
        </ul>
      </div>
      <div class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#01472e]/10 shadow-forest">
        <h2 class="font-anton text-xl sm:text-2xl text-[#01472e] mb-3 sm:mb-4 pb-2 border-b-2 border-[#ccd5ae] uppercase tracking-wide">Measures</h2>
        <ul class="space-y-2 sm:space-y-2.5">
          <template v-for="(el, ind) of new Array(20)" :key="ind">
            <li v-if="meal[`strMeasure${ind + 1}`]" class="text-xs sm:text-sm font-medium text-[#01472e] flex items-center gap-2.5">
              <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ccd5ae] text-[#01472e] text-[10px] sm:text-xs flex items-center justify-center font-bold shrink-0">{{ ind + 1 }}</span>
              <span>{{ meal[`strMeasure${ind + 1}`] }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
      <YouTubeButton
        v-if="meal.strYoutube"
        :href="meal.strYoutube"
        :title="meal.strMeal"
        :mealId="meal.idMeal"
        inlineTarget="#video-tutorial"
      >
        Watch Video Tutorial
      </YouTubeButton>
      <a
        v-if="meal.strSource"
        :href="meal.strSource"
        target="_blank"
        class="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-[#01472e] text-[#01472e] hover:bg-[#01472e] hover:text-[#fefae0] font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap"
      >
        View Original Source
      </a>
    </div>

    <!-- Embedded Video Tutorial Section -->
    <div
      v-if="meal.strYoutube && youtubeEmbedUrl"
      id="video-tutorial"
      class="my-8 sm:my-12 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#01472e]/10 shadow-forest text-[#01472e]"
    >
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#01472e]/10">
        <div>
          <p class="uppercase tracking-[0.3em] text-[0.65rem] sm:text-[0.7rem] font-bold text-[#a3b18a] mb-1">Step-by-Step</p>
          <h2 class="font-anton text-xl sm:text-3xl text-[#01472e] uppercase tracking-wide">Video Tutorial</h2>
        </div>
        <button
          type="button"
          @click="openModalPlayer"
          class="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#01472e]/20 text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-[#01472e] hover:bg-[#01472e] hover:text-[#fefae0] transition-all cursor-pointer self-start sm:self-auto"
          title="Open Theater Mode Modal"
        >
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
          Theater Mode
        </button>
      </div>

      <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
        <iframe
          :src="youtubeEmbedUrl"
          :title="meal.strMeal + ' Video Tutorial'"
          class="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <div class="mt-4 flex items-center justify-between text-xs text-[#01472e]/70">
        <span class="inline-flex items-center gap-2 font-medium">
          <svg class="w-4 h-4 text-red-600 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          Playing directly on Forkful
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axiosClient from '../axiosClient';
import YouTubeButton from '../components/YouTubeButton.vue';
import { getYouTubeEmbedUrl } from '../utils/youtube';
import { useVideoModal } from '../composables/useVideoModal';

const route = useRoute();
const meal = ref({});
const { openVideo } = useVideoModal();

const youtubeEmbedUrl = computed(() => {
  return meal.value?.strYoutube ? getYouTubeEmbedUrl(meal.value.strYoutube) : null;
});

function openModalPlayer() {
  if (meal.value?.strYoutube) {
    openVideo({
      url: meal.value.strYoutube,
      title: meal.value.strMeal,
      id: meal.value.idMeal
    });
  }
}

onMounted(() => {
  axiosClient.get(`lookup.php?i=${route.params.id}`)
    .then(({ data }) => {
      meal.value = data.meals?.[0] || {};
    });
});
</script>
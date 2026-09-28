<template>
  <div class="max-w-[900px] mx-auto p-6 sm:p-8">
    <p class="uppercase tracking-[0.3em] text-[0.7rem] font-bold text-[#a3b18a] mb-2">Recipe Detail</p>
    <h1 class="text-4xl sm:text-6xl font-anton text-[#01472e] mb-6 tracking-tight leading-tight uppercase">{{ meal.strMeal }}</h1>
    
    <div class="rounded-[2.5rem] overflow-hidden shadow-forest border border-[#01472e]/10 bg-[#d4d9b9] mb-8 aspect-video">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-full object-cover">
    </div>

    <!-- Metadata Badges -->
    <div class="flex flex-wrap gap-3 mb-8">
      <div v-if="meal.strCategory" class="inline-flex items-center gap-2 bg-[#01472e] text-[#fefae0] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] shadow-sm">
        <span class="opacity-75 font-normal">Category:</span>
        <span>{{ meal.strCategory }}</span>
      </div>
      <div v-if="meal.strArea" class="inline-flex items-center gap-2 bg-[#a3b18a] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] shadow-sm">
        <span class="opacity-75 font-normal">Origin:</span>
        <span>{{ meal.strArea }}</span>
      </div>
      <div v-if="meal.strTags" class="inline-flex items-center gap-2 bg-[#ccd5ae] text-[#01472e] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] shadow-sm">
        <span class="opacity-75 font-normal">Tags:</span>
        <span>{{ meal.strTags }}</span>
      </div>
    </div>

    <!-- Instructions -->
    <div class="my-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#01472e]/10 shadow-forest text-[#01472e]">
      <h2 class="font-anton text-3xl text-[#01472e] mb-4 uppercase tracking-wide">Preparation & Method</h2>
      <div class="whitespace-pre-line text-sm sm:text-base leading-relaxed opacity-90">
        {{ meal.strInstructions }}
      </div>
    </div>

    <!-- Ingredients & Measures -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#01472e]/10 shadow-forest">
        <h2 class="font-anton text-2xl text-[#01472e] mb-4 pb-2 border-b-2 border-[#ccd5ae] uppercase tracking-wide">Ingredients</h2>
        <ul class="space-y-2.5">
          <template v-for="(el, ind) of new Array(20)" :key="ind">
            <li v-if="meal[`strIngredient${ind + 1}`]" class="text-sm font-medium text-[#01472e] flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-full bg-[#e9edc9] text-[#01472e] text-xs flex items-center justify-center font-bold shrink-0">{{ ind + 1 }}</span>
              <span>{{ meal[`strIngredient${ind + 1}`] }}</span>
            </li>
          </template>
        </ul>
      </div>
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#01472e]/10 shadow-forest">
        <h2 class="font-anton text-2xl text-[#01472e] mb-4 pb-2 border-b-2 border-[#ccd5ae] uppercase tracking-wide">Measures</h2>
        <ul class="space-y-2.5">
          <template v-for="(el, ind) of new Array(20)" :key="ind">
            <li v-if="meal[`strMeasure${ind + 1}`]" class="text-sm font-medium text-[#01472e] flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-full bg-[#ccd5ae] text-[#01472e] text-xs flex items-center justify-center font-bold shrink-0">{{ ind + 1 }}</span>
              <span>{{ meal[`strMeasure${ind + 1}`] }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 flex flex-wrap items-center gap-4">
      <YouTubeButton v-if="meal.strYoutube" :href="meal.strYoutube" />
      <a
        v-if="meal.strSource"
        :href="meal.strSource"
        target="_blank"
        class="inline-flex items-center px-5 py-2.5 rounded-full border-2 border-[#01472e] text-[#01472e] hover:bg-[#01472e] hover:text-[#fefae0] font-bold text-xs uppercase tracking-[0.2em] transition-all"
      >
        View Original Source
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import axiosClient from '../axiosClient';
import YouTubeButton from '../components/YouTubeButton.vue';

const route = useRoute();
const meal = ref({})

onMounted(() => {
  axiosClient.get(`lookup.php?i=${route.params.id}`)
    .then(({ data }) => {
      meal.value = data.meals[0] || {}
    })
})
</script>
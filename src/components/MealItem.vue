<template>
  <div
    class="bg-white rounded-3xl border border-[#01472e]/10 shadow-[0_20px_40px_-15px_rgba(1,71,46,0.12)] hover:shadow-[0_25px_50px_-12px_rgba(1,71,46,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
  >
    <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }" class="overflow-hidden bg-[#d4d9b9] aspect-[16/10] block">
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </router-link>
    <div class="p-6 flex flex-col flex-1">
      <h3 class="font-bold text-xl text-[#01472e] mb-2 leading-snug">{{ meal.strMeal }}</h3>
      <p class="mb-5 text-[#01472e]/75 text-sm leading-relaxed flex-1">
        {{ $filters.truncateWords(meal.strInstructions, 20) }}
      </p>
      <div class="flex items-center justify-between gap-3 pt-3 border-t border-[#01472e]/10">
        <YouTubeButton :href="meal.strYoutube" />
        <router-link
          :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
          class="px-4 py-2 rounded-full border border-[#01472e]/30 text-[#01472e] hover:bg-[#01472e] hover:text-[#fefae0] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
        >
          View Recipe
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import YouTubeButton from './YouTubeButton.vue';

const { meal } = defineProps({
  meal: {
    required: true,
    type: Object
  }
})
</script>
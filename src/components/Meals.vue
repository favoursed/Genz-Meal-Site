<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-8">
    <MealItem v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
  </div>
  <div v-if="!meals.length" class="flex flex-col items-center justify-center text-[#01472e]/60 py-16 px-8 text-center">
    <p class="font-anton text-3xl mb-2 text-[#01472e]/40 tracking-wider">NO MEALS FOUND</p>
    <p class="text-sm font-medium">Try exploring with a different search keyword or letter.</p>
  </div>
</template>

<script setup>
import MealItem from './MealItem.vue';

const { meals } = defineProps({
  meals: {
    required: true,
    type: Array,
  }
})
</script>
<template>
  <div class="max-w-[1200px] mx-auto pb-16">
    <div class="p-4 sm:p-8 pb-4 sm:pb-6">
      <p class="uppercase tracking-[0.3em] text-[0.65rem] sm:text-[0.7rem] font-bold text-[#a3b18a] mb-1.5 sm:mb-2">Ingredient Focus</p>
      <h1 class="text-3xl sm:text-5xl font-anton text-[#01472e] tracking-tight uppercase">Meals with {{ ingredient?.strIngredient || route.params.ingredient }}</h1>
    </div>

    <Meals :meals="meals" />
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import Meals from '../components/Meals.vue'

import { useMealStore } from "../store/useMealStore";

const store = useMealStore();

const route = useRoute();
const ingredient = computed(() => store.ingredient)
const meals = computed(() => store.mealsByIngredient)

onMounted(() => {
  store.searchMealsByIngredient(route.params.ingredient)
})

</script>
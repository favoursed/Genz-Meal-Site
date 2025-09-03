<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-blue-500">Meals for {{ ingredient.strIngredient }}</h1>
  </div>

  <Meals :meals="meals" />
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
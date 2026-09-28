<template>
  <div class="max-w-[1200px] mx-auto pb-16">
    <div class="p-8 pb-4">
      <p class="uppercase tracking-[0.3em] text-[0.7rem] font-bold text-[#a3b18a] mb-2">Alphabetical Index</p>
      <h1 class="text-4xl sm:text-5xl font-anton text-[#01472e] tracking-tight uppercase mb-6">Meals by Letter</h1>
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 py-2">
        <router-link
          :to="{ name: 'byLetter', params: { letter } }"
          v-for="letter of letters"
          :key="letter"
          class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-anton text-base text-[#01472e] border border-[#01472e]/15 bg-white hover:bg-[#01472e] hover:text-[#fefae0] hover:scale-110 active:scale-95 transition-all shadow-sm"
          active-class="!bg-[#01472e] !text-[#fefae0] !border-[#01472e]"
        >
          {{ letter }}
        </router-link>
      </div>
    </div>

    <Meals :meals="meals" />
  </div>
</template>

<script setup>
import Meals from "../components/Meals.vue";
import { useMealStore } from "../store/useMealStore";
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';

const store = useMealStore();
const route = useRoute();
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const meals = ref([]);

watch(route, () => {
  store.searchMealsByLetter(route.params.letter); 
  meals.value = store.mealsByLetter
});

onMounted(async () => {
  await store.searchMealsByLetter(route.params.letter); 
  meals.value = store.mealsByLetter; 
});
</script>
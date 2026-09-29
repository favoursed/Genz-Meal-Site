<template>
  <div class="max-w-[1200px] mx-auto pb-16">
    <div class="p-4 sm:p-8 pb-3 sm:pb-4">
      <p class="uppercase tracking-[0.3em] text-[0.65rem] sm:text-[0.7rem] font-bold text-[#a3b18a] mb-1.5 sm:mb-2">Culinary Archive</p>
      <h1 class="text-3xl sm:text-5xl font-anton text-[#01472e] tracking-tight uppercase mb-4 sm:mb-6">Search Meals by Name</h1>
      <div class="pb-2 sm:pb-4">
        <input
          type="text"
          v-model="keyword"
          class="rounded-full border-2 bg-white border-[#ccd5ae] focus:ring-2 focus:ring-[#01472e] focus:border-[#01472e] text-[#01472e] placeholder-[#01472e]/40 px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base w-full shadow-sm outline-none transition-all font-medium"
          placeholder="Type recipe or meal name..."
          @change="searchMeals"
          @input="searchMeals"
        />
      </div>
    </div>

    <Meals :meals="meals" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Meals from '../components/Meals.vue'
import { useMealStore } from "../store/useMealStore";

const store = useMealStore();
const route = useRoute();
const keyword = ref("");

onMounted(() => {
  keyword.value = route.params.name || "";
  if (keyword.value) {
    searchMeals();
  }
});

const meals = computed(() => store.searchedMeals);

function searchMeals() {
  if (keyword.value) {
    store.searchMeals(keyword.value);
  } else {
    store.searchedMeals = [];
  }
}
</script>
<template>
  <div class="max-w-[1200px] mx-auto pb-16">
    <div class="p-8 pb-4">
      <p class="uppercase tracking-[0.3em] text-[0.7rem] font-bold text-[#a3b18a] mb-2">Seasonal Pantry</p>
      <h1 class="text-4xl sm:text-5xl font-anton text-[#01472e] tracking-tight uppercase mb-6">Ingredients</h1>
      <div class="pb-2">
        <input
          type="text"
          v-model="keyword"
          class="rounded-full border-2 bg-white border-[#ccd5ae] focus:ring-2 focus:ring-[#01472e] focus:border-[#01472e] text-[#01472e] placeholder-[#01472e]/40 px-6 py-3.5 w-full shadow-sm outline-none transition-all font-medium"
          placeholder="Search pantry ingredients..."
        />
      </div>
    </div>
    <div class="px-8 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="#"
          @click.prevent="openIngredient(ingredient)"
          v-for="ingredient of computedIngredients"
          :key="ingredient.idIngredient"
          class="block bg-white rounded-2xl p-5 shadow-[0_4px_20px_-2px_rgba(1,71,46,0.06)] border border-[#01472e]/10 hover:border-[#01472e] hover:shadow-[0_20px_40px_-15px_rgba(1,71,46,0.18)] hover:-translate-y-1 transition-all group"
        >
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-lg font-bold text-[#01472e]">{{ ingredient.strIngredient }}</h3>
            <span class="text-xs uppercase tracking-widest text-[#a3b18a] font-bold group-hover:translate-x-1 transition-transform">Explore →</span>
          </div>
          <p v-if="ingredient.strDescription" class="mt-2 text-xs text-[#01472e]/70 line-clamp-2 leading-relaxed">
            {{ ingredient.strDescription }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axiosClient";
import { useMealStore } from "../store/useMealStore";

const store = useMealStore();

const router = useRouter();
const keyword = ref("");
const ingredients = ref([]);
const computedIngredients = computed(() => {
  if (!computedIngredients) return ingredients;
  return ingredients.value.filter((i) =>
    i.strIngredient.toLowerCase().includes(keyword.value.toLowerCase())
  );
});

function openIngredient(ingredient) {
  store.setIngredient(ingredient)
  router.push({
    name: "byIngredient",
    params: { ingredient: ingredient.strIngredient },
  });
}

onMounted(() => {
  axiosClient.get("list.php?i=list").then(({ data }) => {
    ingredients.value = data.meals;
  });
});
</script>
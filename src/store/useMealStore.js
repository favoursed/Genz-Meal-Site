import { defineStore } from "pinia";
import axiosClient from '../axiosClient';

export const useMealStore = defineStore('mealStore', {
  state: () => ({
    searchedMeals: [],
    mealsByLetter: [],
    mealsByIngredient: [],
    ingredient: {}
  }),

  actions: {
    async searchMeals(keyword) {
      try {
        const { data } = await axiosClient.get(`search.php?s=${keyword}`);
        this.searchedMeals = data.meals || [];  
      } catch (error) {
        console.error("Error searching meals:", error);
      }
    },

    async searchMealsByLetter(letter) {
      try {
        const { data } = await axiosClient.get(`search.php?f=${letter}`);
        this.mealsByLetter = data.meals || [];  
      } catch (error) {
        console.error("Error searching meals by letter:", error);
      }
    },

    async searchMealsByIngredient(ingredient) {
      try {
        const { data } = await axiosClient.get(`filter.php?i=${ingredient}`);
        this.mealsByIngredient = data.meals || [];  
      } catch (error) {
        console.error("Error searching meals by ingredient:", error);
      }
    },

    setIngredient(ingredient) {
      this.ingredient = ingredient;
    }
  }
});
<template>
  <div class="min-h-screen bg-[#fefae0] text-[#01472e] flex flex-col relative">
    <div class="noise-overlay"></div>
    <navbar />
    <main class="flex-1">
      <router-view />
    </main>
    <footer class="bg-[#01472e] text-[#ccd5ae] pt-20 sm:pt-28 pb-12 px-6 sm:px-12 rounded-t-[3.5rem] sm:rounded-t-[5rem] mt-auto relative z-30">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
        <div class="md:col-span-6">
          <p class="uppercase tracking-[0.3em] text-[0.7rem] font-bold mb-4 text-[#a3b18a]">Newsletter</p>
          <h3 class="font-anton text-4xl sm:text-5xl mb-6 text-[#fefae0] tracking-wide">Stay in the harvest loop.</h3>
          <form @submit.prevent class="flex flex-col gap-4 max-w-md">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              class="bg-transparent border-b border-[#ccd5ae]/30 py-3 focus:outline-none focus:border-[#ccd5ae] uppercase tracking-[0.2em] font-bold text-xs text-[#fefae0] placeholder-[#ccd5ae]/50"
            />
            <button
              type="submit"
              class="text-left uppercase tracking-[0.25em] text-[0.7rem] font-bold text-xs hover:opacity-75 transition-opacity flex items-center gap-2 text-[#fefae0]"
            >
              Subscribe →
            </button>
          </form>
        </div>
        <div class="md:col-span-3 md:col-start-8">
          <p class="uppercase tracking-[0.3em] text-[0.7rem] font-bold mb-4 text-[#a3b18a]">Explore</p>
          <ul class="flex flex-col gap-3 text-xs uppercase tracking-[0.2em] font-bold">
            <li>
              <router-link :to="{ name: 'home' }" class="hover:text-[#fefae0] transition-colors">Home Page</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'byName' }" class="hover:text-[#fefae0] transition-colors">Search Recipes</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'byLetter' }" class="hover:text-[#fefae0] transition-colors">Meals By Letter</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'ingredients' }" class="hover:text-[#fefae0] transition-colors">Ingredients Pantry</router-link>
            </li>
          </ul>
        </div>
        <div class="md:col-span-2">
          <p class="uppercase tracking-[0.3em] text-[0.7rem] font-bold mb-4 text-[#a3b18a]">Philosophy</p>
          <p class="text-xs leading-relaxed opacity-75">Curated culinary techniques meet seasonal ingredients for the modern table.</p>
        </div>
      </div>
      <div class="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center opacity-40 text-[10px] uppercase tracking-[0.25em] font-bold pt-8 border-t border-[#ccd5ae]/10 gap-3">
        <p>© 2024 FORKFUL PLATFORM. All rights reserved.</p>
        <p>The Art of Seasonal Cooking</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>
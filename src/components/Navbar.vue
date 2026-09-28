<template>
  <header class="bg-white/80 backdrop-blur-md border-b border-[#01472e]/10 shadow-sm sticky top-0 z-50">
    <div class="max-w-[1300px] mx-auto px-6 h-20 flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
      <router-link
        :to="{ name: 'home' }"
        class="inline-flex items-center text-[#01472e] font-anton text-2xl sm:text-3xl tracking-tight hover:opacity-75 transition-opacity"
      >
        — FORKFUL
      </router-link>
      <nav class="flex items-center gap-1.5 sm:gap-3">
        <router-link
          :to="{ name: 'home' }"
          class="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0]"
          exact-active-class="bg-[#01472e] !text-[#fefae0]"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'byName' }"
          class="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0]"
          active-class="bg-[#01472e] !text-[#fefae0]"
        >
          Search Meals
        </router-link>
        <router-link
          :to="{ name: 'byLetter' }"
          class="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0]"
          active-class="bg-[#01472e] !text-[#fefae0]"
        >
          By Letter
        </router-link>
        <router-link
          :to="{ name: 'ingredients' }"
          class="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0]"
          active-class="bg-[#01472e] !text-[#fefae0]"
        >
          Ingredients
        </router-link>
      </nav>
    </div>
  </header>
</template>
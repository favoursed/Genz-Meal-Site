<template>
  <header class="bg-white/85 backdrop-blur-md border-b border-[#01472e]/10 shadow-sm sticky top-0 z-50">
    <div class="max-w-[1300px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
      <router-link
        :to="{ name: 'home' }"
        class="inline-flex items-center text-[#01472e] font-anton text-xl sm:text-3xl tracking-tight hover:opacity-75 transition-opacity shrink-0"
      >
        — FORKFUL
      </router-link>
      <nav class="flex items-center gap-1 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
        <router-link
          :to="{ name: 'home' }"
          class="inline-flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0] whitespace-nowrap shrink-0"
          exact-active-class="bg-[#01472e] !text-[#fefae0]"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'byName' }"
          class="inline-flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0] whitespace-nowrap shrink-0"
          active-class="bg-[#01472e] !text-[#fefae0]"
        >
          Search
        </router-link>
        <router-link
          :to="{ name: 'byLetter' }"
          class="inline-flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0] whitespace-nowrap shrink-0"
          active-class="bg-[#01472e] !text-[#fefae0]"
        >
          Letters
        </router-link>
        <router-link
          :to="{ name: 'ingredients' }"
          class="inline-flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#01472e] transition-all hover:bg-[#01472e] hover:text-[#fefae0] whitespace-nowrap shrink-0"
          active-class="bg-[#01472e] !text-[#fefae0]"
        >
          Pantry
        </router-link>
      </nav>
    </div>
  </header>
</template>
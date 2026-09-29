<template>
  <button
    v-if="href"
    type="button"
    @click="handleClick"
    class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#fefae0] bg-[#01472e] border border-[#01472e] hover:bg-[#01472e]/90 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
    :title="title ? `Watch ${title} video` : 'Watch recipe video on site'"
  >
    <svg class="w-3.5 h-3.5 fill-current text-red-500" viewBox="0 0 24 24">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
    <slot>Watch Video</slot>
  </button>
</template>

<script setup>
import { useVideoModal } from '../composables/useVideoModal';

const props = defineProps({
  href: {
    type: String,
    required: false,
    default: ''
  },
  title: {
    type: String,
    default: 'Recipe Tutorial'
  },
  mealId: {
    type: [String, Number],
    default: null
  },
  inlineTarget: {
    type: String,
    default: ''
  }
});

const { openVideo } = useVideoModal();

function handleClick() {
  if (props.inlineTarget) {
    const el = document.querySelector(props.inlineTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }

  // Open in-site video modal
  openVideo({
    url: props.href,
    title: props.title,
    id: props.mealId
  });
}
</script>
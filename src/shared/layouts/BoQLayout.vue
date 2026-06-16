<script setup lang="ts">

const props = defineProps({
  lectureTitle: {
    type: String,
    default: 'Quantity Surveying'
  },
  moduleCode: {
    type: String,
    default: 'QS-101'
  }
})
</script>

<template>
  <div class="boq-layout-container flex flex-col h-full justify-between p-8 bg-slate-900 text-slate-100 font-sans border-2 border-slate-700 rounded-lg shadow-2xl relative overflow-hidden">
    <!-- Top Header -->
    <header class="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
      <div class="flex items-center space-x-3">
        <span class="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold rounded text-xs tracking-wider">
          {{ props.moduleCode }}
        </span>
        <h1 class="text-sm font-semibold tracking-wide text-slate-300">
          {{ props.lectureTitle }}
        </h1>
      </div>
      
      <!-- Adaptive View Toggles -->
      <div class="flex items-center space-x-2 text-xs">
        <a 
          href="/all" 
          class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700 no-underline"
          title="Switch to Textbook Overview View"
        >
          📖 Scroll View
        </a>
        <a 
          href="/1" 
          class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700 no-underline"
          title="Switch to Slideshow Presentation View"
        >
          📽️ Slide View
        </a>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow flex flex-col justify-center text-slate-200">
      <slot />
    </main>

    <!-- Bottom Footer -->
    <footer class="flex justify-between items-center border-t border-slate-700 pt-3 mt-4 text-xs text-slate-400">
      <div>
        <span>CEE Department &copy; 2026</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="font-mono text-amber-400">PAGE {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.boq-layout-container {
  min-height: 100%;
}
</style>

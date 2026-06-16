<script setup lang="ts">
import { ref, inject } from 'vue';
import { QSEngineKey } from '@/services/di/keys';

const qsEngine = inject(QSEngineKey);

const step = ref(1);

// Inputs in user-friendly units (Length in m, Width in m, Height in m, Wastage in %)
const length = ref(10);
const width = ref(0.3);
const height = ref(0.4);
const wastagePercent = ref(5); // 5%

const result = ref<number | null>(null);

const nextStep = () => {
  if (step.value === 2) {
    calculate();
  }
  step.value++;
};

const prevStep = () => {
  step.value--;
};

const reset = () => {
  step.value = 1;
  result.value = null;
};

const calculate = () => {
  if (!qsEngine) return;
  // Convert wastage from % to factor (e.g. 5% -> 0.05)
  const factor = wastagePercent.value / 100;
  const res = qsEngine.calculateConcreteVolume(
    length.value,
    width.value,
    height.value,
    factor
  );
  result.value = res.volume;
};
</script>

<template>
  <div class="step-concrete-wizard max-w-lg mx-auto bg-slate-800 border border-slate-700 p-6 rounded-lg text-slate-100 shadow-xl text-left my-4 font-sans">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 pb-2 border-b border-slate-700">
      <h3 class="text-sm font-bold text-amber-400">Step-by-Step Concrete Estimator</h3>
      <span class="text-xs text-slate-400">Step {{ step }} of 3</span>
    </div>

    <!-- Step 1: Formula Details -->
    <div v-if="step === 1" class="space-y-3">
      <h4 class="text-xs uppercase font-bold tracking-wider text-slate-300">1. Understanding the Mathematics</h4>
      <p class="text-xs text-slate-400 leading-relaxed">
        To calculate the total wet concrete volume required for a structural element (like a foundation or beam), we measure the physical bounding box and add a waste margin factor:
      </p>
      <div class="bg-slate-900 p-3.5 rounded text-center my-3 font-mono text-sm border border-slate-750 text-amber-300">
        Volume = L × W × H × (1 + Wastage Factor)
      </div>
      <p class="text-xs text-slate-400">
        Where standard wastage parameters default to <strong class="text-slate-300">5% (0.05)</strong> to account for formwork swelling, spillage, and surface irregularities.
      </p>
    </div>

    <!-- Step 2: Dimensions Form -->
    <div v-if="step === 2" class="space-y-4">
      <h4 class="text-xs uppercase font-bold tracking-wider text-slate-300">2. Input Bounding Dimensions</h4>
      
      <div class="grid grid-cols-2 gap-3.5">
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Length (meters)</label>
          <input 
            v-model.number="length" 
            type="number" 
            step="0.1" 
            class="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Width (meters)</label>
          <input 
            v-model.number="width" 
            type="number" 
            step="0.05" 
            class="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Height (meters)</label>
          <input 
            v-model.number="height" 
            type="number" 
            step="0.05" 
            class="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Wastage (%)</label>
          <input 
            v-model.number="wastagePercent" 
            type="number" 
            step="1" 
            class="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>
    </div>

    <!-- Step 3: Result Summary -->
    <div v-if="step === 3" class="space-y-3 text-center py-4">
      <h4 class="text-xs uppercase font-bold tracking-wider text-slate-300 text-left">3. Calculation Summary</h4>
      <div class="inline-block bg-slate-900 px-8 py-6 rounded border border-slate-700 my-2">
        <span class="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Total Volume Required</span>
        <span class="text-3xl font-extrabold text-amber-400 font-mono">{{ result }} m³</span>
      </div>
      <p class="text-xs text-slate-400 text-left leading-relaxed">
        Calculated using physical dimensions <span class="text-slate-200">{{ length }}m × {{ width }}m × {{ height }}m</span> and a waste allocation of <span class="text-slate-200">{{ wastagePercent }}%</span>.
      </p>
    </div>

    <!-- Navigation Footer -->
    <div class="flex justify-between items-center mt-6 pt-3 border-t border-slate-700">
      <button 
        v-if="step > 1" 
        @click="prevStep"
        class="px-3 py-1.5 bg-slate-700 hover:bg-slate-650 text-slate-200 rounded text-xs font-semibold transition cursor-pointer"
      >
        Back
      </button>
      <div v-else></div>

      <button 
        v-if="step < 3" 
        @click="nextStep"
        class="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition cursor-pointer"
      >
        Next Step
      </button>

      <button 
        v-if="step === 3" 
        @click="reset"
        class="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition cursor-pointer"
      >
        Reset Form
      </button>
    </div>
  </div>
</template>

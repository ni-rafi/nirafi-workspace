<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { QSEngineKey } from '@/services/di/keys';

const qsEngine = inject(QSEngineKey);

// 1. Concrete inputs
const concLength = ref(5.0);
const concWidth = ref(0.3);
const concHeight = ref(0.5);
const concWastage = ref(5); // %

// 2. Brickwork inputs
const wallArea = ref(20.0);
const wallThickness = ref(0.24);
const mortarThickness = ref(10); // mm

// 3. Steel inputs
const steelDia = ref(16); // mm
const steelLength = ref(120); // m

// Computed valuations
const concreteVolume = computed(() => {
  if (!qsEngine) return 0;
  return qsEngine.calculateConcreteVolume(
    concLength.value,
    concWidth.value,
    concHeight.value,
    concWastage.value / 100
  ).volume;
});

const brickworkEstimate = computed(() => {
  if (!qsEngine) return { brickCount: 0, mortarVolume: 0 };
  // standard brick: 240mm x 115mm x 70mm -> 0.24m x 0.115m x 0.07m
  return qsEngine.calculateBrickwork(
    wallArea.value,
    wallThickness.value,
    0.24,
    0.115,
    0.07,
    mortarThickness.value / 1000
  );
});

const steelWeight = computed(() => {
  if (!qsEngine) return 0;
  return qsEngine.calculateSteelWeight(steelDia.value, steelLength.value).weightKg;
});
</script>

<template>
  <div class="boq-spreadsheet-container font-sans text-slate-200 bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-xl max-w-4xl mx-auto my-4 text-left">
    <div class="mb-5 border-b border-slate-700 pb-3 flex justify-between items-center">
      <div>
        <h3 class="text-sm font-bold text-white tracking-wide">Interactive Bill of Quantities (BoQ) Dashboard</h3>
        <p class="text-[11px] text-slate-400 mt-0.5">Live project estimation dashboard compiling Concrete, Brickwork, and Steel weight estimations.</p>
      </div>
      <span class="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase rounded">
        Calculations Live
      </span>
    </div>

    <!-- Layout Grid: Inputs on Left, BoQ table on Right -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
      
      <!-- Inputs Column (Span 2) -->
      <div class="md:col-span-2 space-y-4 border-r border-slate-800 pr-0 md:pr-6">
        <h4 class="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Property Adjustments</h4>

        <!-- Concrete Controls -->
        <div class="bg-slate-800/40 p-3 rounded border border-slate-750 space-y-2">
          <span class="block text-[10px] uppercase font-bold text-amber-400">1. Concrete Beam Dimensions</span>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label class="block text-[10px] text-slate-400 mb-0.5">Length (m)</label>
              <input v-model.number="concLength" type="number" step="0.5" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 mb-0.5">Width (m)</label>
              <input v-model.number="concWidth" type="number" step="0.05" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 mb-0.5">Height (m)</label>
              <input v-model.number="concHeight" type="number" step="0.05" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 mb-0.5">Waste (%)</label>
              <input v-model.number="concWastage" type="number" step="1" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
          </div>
        </div>

        <!-- Brickwork Controls -->
        <div class="bg-slate-800/40 p-3 rounded border border-slate-750 space-y-2">
          <span class="block text-[10px] uppercase font-bold text-amber-400">2. Brickwork Wall Properties</span>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <div class="col-span-1">
              <label class="block text-[10px] text-slate-400 mb-0.5">Area (m²)</label>
              <input v-model.number="wallArea" type="number" step="1" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
            <div class="col-span-1">
              <label class="block text-[10px] text-slate-400 mb-0.5">Thick (m)</label>
              <input v-model.number="wallThickness" type="number" step="0.01" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
            <div class="col-span-1">
              <label class="block text-[10px] text-slate-400 mb-0.5">Joint (mm)</label>
              <input v-model.number="mortarThickness" type="number" step="1" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
          </div>
        </div>

        <!-- Steel Controls -->
        <div class="bg-slate-800/40 p-3 rounded border border-slate-750 space-y-2">
          <span class="block text-[10px] uppercase font-bold text-amber-400">3. Steel Rebar Specification</span>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label class="block text-[10px] text-slate-400 mb-0.5">Diameter (mm)</label>
              <select v-model.number="steelDia" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100 focus:outline-none">
                <option :value="10">10 mm</option>
                <option :value="12">12 mm</option>
                <option :value="16">16 mm</option>
                <option :value="20">20 mm</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 mb-0.5">Total Length (m)</label>
              <input v-model.number="steelLength" type="number" step="10" class="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-100" />
            </div>
          </div>
        </div>
      </div>

      <!-- BoQ Sheet Output Column (Span 3) -->
      <div class="md:col-span-3 space-y-4">
        <h4 class="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Calculation Spreadsheet Output</h4>

        <div class="overflow-x-auto rounded border border-slate-800">
          <table class="w-full text-left text-xs border-collapse bg-slate-950/40">
            <thead>
              <tr class="bg-slate-850 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                <th class="p-3">Item Description</th>
                <th class="p-3 text-right">Computed Quantity</th>
                <th class="p-3 text-center">Unit</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-850">
              <!-- Concrete row -->
              <tr>
                <td class="p-3 font-medium">Concrete Volume (Wastage Included)</td>
                <td class="p-3 text-right font-mono text-amber-400 font-bold">{{ concreteVolume }}</td>
                <td class="p-3 text-center text-slate-500 font-mono">m³</td>
              </tr>
              <!-- Brick count row -->
              <tr>
                <td class="p-3 font-medium">Total Bricks Count (Standard 240mm Jointed)</td>
                <td class="p-3 text-right font-mono text-amber-400 font-bold">{{ brickworkEstimate.brickCount }}</td>
                <td class="p-3 text-center text-slate-500 font-mono">pcs</td>
              </tr>
              <!-- Mortar row -->
              <tr>
                <td class="p-3 font-medium">Required Mortar Volume</td>
                <td class="p-3 text-right font-mono text-amber-400 font-bold">{{ brickworkEstimate.mortarVolume }}</td>
                <td class="p-3 text-center text-slate-500 font-mono">m³</td>
              </tr>
              <!-- Steel weight row -->
              <tr>
                <td class="p-3 font-medium">Rebar Steel Mass Weight (D={{ steelDia }}mm)</td>
                <td class="p-3 text-right font-mono text-amber-400 font-bold">{{ steelWeight }}</td>
                <td class="p-3 text-center text-slate-500 font-mono">kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-slate-850 p-3 rounded text-[11px] text-slate-400 italic leading-relaxed border border-slate-800">
          💡 **Lecturer Tip:** Notice how changing structural sizes instantly reflects inside the BoQ grid cells above. The calculations use the identical mathematical model run in standard student step-by-step card screens.
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
th, td {
  border-bottom-width: 1px;
}
</style>

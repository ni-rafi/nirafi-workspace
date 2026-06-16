<script setup lang="ts">
import { ref, inject } from 'vue';
import { UserContextKey } from '@/services/di/keys';

const studentName = ref('');
const registrationNumber = ref('');
const session = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const userContext = inject(UserContextKey);

const handleRegister = async () => {
  if (!userContext) return;
  
  errorMessage.value = '';
  isSubmitting.value = true;
  
  try {
    await userContext.updateGateInfo(
      registrationNumber.value,
      session.value,
      studentName.value
    );
  } catch (error) {
    const err = error as Error;
    errorMessage.value = err.message || 'Verification failed. Please check inputs.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div 
    v-if="userContext && !userContext.isGatePassed.value && !userContext.loading.value" 
    class="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 font-sans text-slate-200"
  >
    <div class="max-w-md w-full bg-slate-900 border border-slate-700/60 p-8 rounded-xl shadow-2xl relative">
      <div class="text-center mb-6">
        <span class="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 font-semibold text-xs uppercase tracking-wider rounded-full border border-amber-500/20 mb-3">
          Verification Lock
        </span>
        <h2 class="text-xl font-bold tracking-tight text-white">Student Identification Gate</h2>
        <p class="text-xs text-slate-400 mt-1">Please enter your academic details to unlock the lecture slides.</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
          <input 
            v-model="studentName"
            type="text" 
            placeholder="e.g. John Doe" 
            class="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm transition"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Registration Number</label>
          <input 
            v-model="registrationNumber"
            type="text" 
            placeholder="e.g. 2016333012 (10 digits)" 
            class="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm transition"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Academic Session</label>
          <input 
            v-model="session"
            type="text" 
            placeholder="e.g. 2016-17 or 2021-22" 
            class="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm transition"
          />
        </div>

        <div v-if="errorMessage" class="text-xs text-red-400 bg-red-900/20 border border-red-500/20 p-2.5 rounded">
          ⚠️ {{ errorMessage }}
        </div>

        <button 
          @click="handleRegister"
          :disabled="isSubmitting"
          class="w-full py-2.5 bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold rounded text-sm transition cursor-pointer disabled:opacity-50"
        >
          {{ isSubmitting ? 'Verifying...' : 'Unlock Lecture Slides' }}
        </button>
      </div>
    </div>
  </div>
</template>

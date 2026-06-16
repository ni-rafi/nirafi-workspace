<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { FirebaseServiceKey, UserContextKey } from '@/services/di/keys';
import type { QuizResponsePayload } from '@/services/firebase/IFirebaseService';

const props = defineProps({
  quizId: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array as () => string[],
    required: true
  },
  correctIndex: {
    type: Number,
    required: true
  }
});

const firebaseService = inject(FirebaseServiceKey);
const userContext = inject(UserContextKey);

const selectedIndex = ref<number | null>(null);
const isSubmitted = ref(false);
const isUploading = ref(false);
const submissionError = ref('');
const showResult = ref(false);

const isCorrect = computed(() => selectedIndex.value === props.correctIndex);

const handleAnswerSelect = (index: number) => {
  if (isSubmitted.value) return;
  selectedIndex.value = index;
};

const submitAnswer = async () => {
  if (selectedIndex.value === null || isSubmitted.value || isUploading.value) return;

  isUploading.value = true;
  submissionError.value = '';

  const name = userContext?.name.value || 'Unknown Student';
  const reg = userContext?.registration.value || 'Unknown Reg';
  const uid = userContext?.uid.value || 'offline_user';

  const payload: QuizResponsePayload = {
    studentUid: uid,
    studentName: name,
    studentRegistration: reg,
    quizId: props.quizId,
    questionText: props.question,
    selectedOptionIndex: selectedIndex.value,
    isCorrect: isCorrect.value,
    timestamp: Date.now()
  };

  try {
    if (firebaseService) {
      await firebaseService.submitQuizResponse(payload);
    }
    isSubmitted.value = true;
    showResult.value = true;
  } catch (error) {
    submissionError.value = 'Database write failed. Attempting offline mode.';
    console.error('Quiz submission error:', error);
    // Graceful offline fallback
    isSubmitted.value = true;
    showResult.value = true;
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="my-4 p-5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 shadow-lg text-left max-w-xl mx-auto">
    <div class="flex items-center justify-between mb-3">
      <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-700 text-slate-300">
        Quiz: {{ props.quizId }}
      </span>
    </div>

    <!-- Question -->
    <h3 class="text-sm font-bold text-white mb-4 leading-snug">{{ props.question }}</h3>

    <!-- Options List -->
    <div class="space-y-2 mb-4">
      <div 
        v-for="(option, idx) in props.options" 
        :key="idx"
        @click="handleAnswerSelect(idx)"
        :class="[
          'px-4 py-2.5 rounded text-xs border transition cursor-pointer select-none',
          selectedIndex === idx
            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
            : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-300',
          isSubmitted && props.correctIndex === idx ? 'bg-green-500/20 border-green-500 text-green-300 font-semibold' : '',
          isSubmitted && selectedIndex === idx && idx !== props.correctIndex ? 'bg-red-500/20 border-red-500 text-red-300' : ''
        ]"
      >
        <div class="flex items-center justify-between">
          <span>{{ option }}</span>
          <span v-if="isSubmitted && props.correctIndex === idx" class="text-green-400">✓ Correct</span>
          <span v-else-if="isSubmitted && selectedIndex === idx && idx !== props.correctIndex" class="text-red-400">✗ Incorrect</span>
        </div>
      </div>
    </div>

    <!-- Feedback messages -->
    <div v-if="submissionError" class="text-[11px] text-yellow-400 mb-3">
      ⚠️ {{ submissionError }}
    </div>

    <!-- CTA & Results -->
    <div class="flex items-center justify-between mt-4 border-t border-slate-700 pt-3">
      <div v-if="showResult" class="text-xs">
        <span v-if="isCorrect" class="text-green-400 font-semibold">🎉 Great job! Correct Answer.</span>
        <span v-else class="text-red-400 font-semibold">❌ Incorrect. Try again in the next lecture.</span>
      </div>
      <div v-else class="text-xs text-slate-400">
        Select an option above to submit.
      </div>

      <button 
        v-if="!isSubmitted"
        @click="submitAnswer"
        :disabled="selectedIndex === null || isUploading"
        class="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs transition cursor-pointer disabled:opacity-50"
      >
        {{ isUploading ? 'Submitting...' : 'Submit Answer' }}
      </button>
    </div>
  </div>
</template>

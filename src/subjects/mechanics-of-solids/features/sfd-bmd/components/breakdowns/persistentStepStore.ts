let lastStepIndex = 0;

export const getLastStep = (): number => {
  return lastStepIndex;
};

export const setLastStep = (step: number): void => {
  lastStepIndex = step;
};

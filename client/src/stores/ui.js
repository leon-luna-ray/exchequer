import { defineStore } from 'pinia';
import { useDark, useToggle } from '@vueuse/core';

export const useUiStore = defineStore('ui', () => {
  // State
  const isDark = useDark();

  // Methods
  const toggleDark = useToggle(isDark);

  return { isDark, toggleDark };
});

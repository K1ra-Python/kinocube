// composables/selectedGenres.js

import { ref } from 'vue'

// Используем ref для реактивной ссылки на выбранные жанры
export const selectedGenres = ref([])

// Функция для установки выбранных жанров
export function setSelectedGenres(genres) {
  selectedGenres.value = genres
}

// Функция для получения выбранных жанров
export function useSelectedGenres() {
  return selectedGenres
}

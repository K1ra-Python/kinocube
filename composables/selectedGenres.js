// composables/selectedGenres.js

import { ref } from 'vue'

// Установить начальное состояние выбранных жанров
const selectedGenres = ref([])

export function useSelectedGenres() {
  function addOrRemoveGenre(genre) {
    const index = selectedGenres.value.indexOf(genre);
    if (index === -1) {
      selectedGenres.value.push(genre);
    } else {
      selectedGenres.value.splice(index, 1);
    }
  }
  return { selectedGenres, addOrRemoveGenre }
}

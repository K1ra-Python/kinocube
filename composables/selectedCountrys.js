// composables/selectedCounties.js
import { ref } from 'vue'

// Установить начальное состояние выбранных стран
const selectedCountries = ref([])

export function useSelectedCountries() {
  function addOrRemoveCountry(country) {
    const index = selectedCountries.value.indexOf(country);
    if (index === -1) {
      selectedCountries.value.push(country);
    } else {
      selectedCountries.value.splice(index, 1);
    }
  }
  return { selectedCountries, addOrRemoveCountry }
}
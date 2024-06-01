<template>
    <div>
      <h1>Детали избранного</h1>
      <p>ID избранного: {{ favoriteId }}</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const favoriteId = route.params.id; // Получаем id из параметров маршрута
  </script>
  
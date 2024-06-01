
<template>
    <div>
      <h1>Список понравившихся:</h1>
      <ul>
        <li v-for="(favoriteId, index) in userFavorites" :key="index">
          {{ favoriteId }} <!-- Так как это просто строка, она корректно отобразится -->
        </li>
      </ul>
    </div>
  </template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();
const auth = getAuth();
const router = useRouter();
const userProfile = ref({});
const userFavorites = ref([]);

onMounted(() => {
  onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      const userDocRef = doc(db, 'users', authUser.uid);
      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          userProfile.value = userDocSnap.data();
          console.log(userFavorites.value)
          userFavorites.value = userProfile.value.favorites || [];
        } else {
          console.error('Нет данных о пользователе');
        }
      } catch (error) {
        console.error('Ошибка при получении данных о пользователе:', error);
      }
    } else {
      console.error('Пользователь не авторизован. Перенаправление на страницу входа.');
      router.push('/authorization');
    }
  });
});
</script>
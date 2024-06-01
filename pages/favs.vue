
<template>
    <div>
        <h1>Список понравившихся:</h1>
        <ul>
            <li v-for="(favoriteId, index) in  userFavorites " :key="index">
                <!-- Используй параметрический маршрут с nuxt-link -->
                <nuxt-link :to="`/liked/${favoriteId}`">{{ favoriteId }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {
    KinopoiskDev,
    MovieQueryBuilder,
    SPECIAL_VALUE
} from '@openmoviedb/kinopoiskdev_client';
const db = getFirestore();
const auth = getAuth();
const router = useRouter();
const userProfile = ref({});
const userFavorites = ref([]);
const movieDetails = ref([]);
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const route = useRoute();
/*Эта асинхронная функция отвечает за показ первого рандомного фильма, дабы внести разнообразие в подборку для пользователя*/
const getMovieById = async (favoriteId) => {
  try {
    const { data, error, message } = await kp.movie.getById(favoriteId);

    if (error) {
      console.error("Ошибка получения данных о фильме с ID " + favoriteId + ":", message);
      return;
    }

    if (data) {
      movieDetails.value.push(data); // Добавляем данные о фильме в массив
      console.log("Подробности фильма с ID " + favoriteId + ":", data);
    }
  } catch (error) {
    console.error("Непредвиденная ошибка при получении фильма с ID " + favoriteId + ":", error);
  }
};
onMounted(() => {
    if (userFavorites.value.length) {
        userFavorites.value.forEach(favoriteId => {
            getMovieById(favoriteId);
        });
    }
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
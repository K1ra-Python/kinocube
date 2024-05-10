<template>
    <div class="filter">

    </div>
    <div class="movie-details">
        <h1></h1>
        <div v-for="movie in movies" :key="movie.id" class="wrapMovie">
            {{ movie.name }}
            <img :src="movie.poster.url" width="100" height="100">
        </div>
        <!-- Ваша форма и описание фильма здесь -->
        <button @click="goBack">Вернуться назад</button>
        <button @click="goToNextMovie">Следующий фильм</button>
    </div>
</template>
  
<script setup>
import {
    KinopoiskDev,
    MovieQueryBuilder,
    SPECIAL_VALUE
} from '@openmoviedb/kinopoiskdev_client';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSelectedGenres} from '~/composables/selectedGenres'
// Здесь ваш клиентский API ключ
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const router = useRouter();
const movieDetails = ref(null);
const route = useRoute()
const genres = useSelectedGenres()
const movies = ref([]);
const filterSearch = async () => {
    const selectedGenres = ['мелодрама', 'ужасы'];

    // Кодируем жанры для URL
    const genreFilters = selectedGenres.map(genre => `genres.name = ${encodeURIComponent(genre)}`).join('&');
    const url = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=1&${genreFilters}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-KEY': 'Y5W270D-51F4EHG-KW5T65G-H56CJ96',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        const { docs, page, limit } = data;

        console.log(`Страница ${page} из ${limit}`);
        console.log(docs);
        movies.value = docs; // Для Vue 3 Composition API

    } catch (error) {
        console.error("Произошла ошибка при выполнении запроса: ", error);
    }
}


/*Эта асинхронная функция отвечает за показ первого рандомного фильма, дабы внести разнообразие в подборку для пользователя*/
const searchMovies = async (movieName) => {
    const queryBuilder = new MovieQueryBuilder();
    // Создаем запрос для поиска фильмов по подходящих под наш запрос
    const query = queryBuilder
        // Указываем что хотим получить фильм 
        .query(movieName)

        // Добавляем пагинацию и получаем 1 страницу по с 1 фильмами на странице
        .paginate(1, 1)
        // Собираем запрос
        .build();

    const { data, error, message } = await kp.movie.getBySearchQuery(query);

    if (data) {
        const { docs, page, limit } = data;
        console.log(`Страница ${page} из ${limit}`);
        console.log(docs);
        moviess.value = docs
    }

    // Если будет ошибка, то выведем ее в консоль
    if (error) console.log(error, message);
};

onMounted(() => {
    const movieName = decodeURIComponent(route.params.newMovie);
    searchMovies(movieName);
    console.log(movieName);
    //getRelatedByQueryBuilderMovies()
    filterSearch();
});

const goBack = () => {
    router.back();
};

const goToNextMovie = () => {

    // Здесь вам нужно будет получить ID следующего фильма
    // Могут быть разные подходы, в зависимости от вашей бизнес-логики
    const nextMovieId = getNextMovieId();
    router.push(`/movies/${nextMovieId}`);
};

// Допустим, у вас есть функция для получения ID следующего фильма
function getNextMovieId() {
    // Вместо заглушки «next-movie-id» укажите логику определения следующего ID фильма
    return 'next-movie-id';
};
</script>
  
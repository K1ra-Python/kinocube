<template>
    <div class="movie-details">
        <h1></h1>
        <div v-for="movie in movies" :key="movie.id" class="wrapMovie">
            {{ movie.name }}
            <img :src="movie.poster"  width="100" height="100">
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

// Здесь ваш клиентский API ключ
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const router = useRouter();
const movieDetails = ref(null);
const route = useRoute()
// Допустим, вы получаете подробности о фильме здесь
// ...
const movies = ref([]);
/**const getRelatedByQueryBuilderMovies = async (movieName) => {
    // Создаем билдер запросов для фильмов
    const queryBuilder = new MovieQueryBuilder();

    // Выбираем поля, которые мы хотим получить в ответе
    // Полный список полей можно посмотреть в документации
    // https://api.kinopoisk.dev/v1/documentation для метода /v1.3/movie
    const query = queryBuilder
        .select(['id', 'name', 'rating', 'poster', 'year'])
        // Добавляем фильтр поиска по указанному диапазону года
        //.filterRange('year', [2020, 2023])
        // Добавляем фильтр поиска по указанному диапазону рейтинга
        //.filterRange('rating.kp', [7.5, 10])
        // Добавляем фильтр для поиска фильмов с постером
        //.filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
        // Добавим страны
        //.filterExact('countries.name', 'США')
        //.filterExact('countries.name', 'Россия')
        // Добавляем сортировку по рейтингу
        // Добавляем пагинацию и получаем 1 страницу по с 10 фильмами на странице
        // Собираем запрос
        .build();

    // Отправляем запрос на получение фильмов
    const { data, error, message } = await kp.movie.getByFilters(query);

    if (data) {
        const { docs, page, limit } = data;
        console.log(`Страница ${page} из ${limit}`);
        console.log(docs);
        movies.value = docs;
    }

    // Если будет ошибка, то выведем ее в консоль
    if (error) console.log(error, message);
};**/

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
        movies.value=docs
    }

    // Если будет ошибка, то выведем ее в консоль
    if (error) console.log(error, message);
};

onMounted(() => {
    const movieName = decodeURIComponent(route.params.newMovie);
    searchMovies(movieName);
    console.log(movieName);
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
  
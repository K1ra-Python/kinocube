<template>
    <div v-for="movie in movies" :key="movie.id" class="wrapMovie">
        {{ movie.name }}
        <img :src="movie.poster.url"  loading="lazy" width="100" height="100">
    </div>
</template>
<script setup>
import {
    KinopoiskDev,
    MovieQueryBuilder,
    SPECIAL_VALUE
} from '@openmoviedb/kinopoiskdev_client';
import { onMounted } from 'vue';
import { ref } from 'vue';


onMounted(() => {
    getRelatedByQueryBuilderMovies();
});
const movies = ref([]);
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const getRelatedByQueryBuilderMovies = async () => {
    // Создаем билдер запросов для фильмов
    const queryBuilder = new MovieQueryBuilder();

    // Выбираем поля, которые мы хотим получить в ответе
    // Полный список полей можно посмотреть в документации
    // https://api.kinopoisk.dev/v1/documentation для метода /v1.3/movie
    const query = queryBuilder
        .select(['id', 'name', 'rating', 'poster', 'year'])
        // Добавляем фильтр поиска по указанному диапазону года
        .filterRange('year', [2020, 2023])
        // Добавляем фильтр поиска по указанному диапазону рейтинга
        .filterRange('rating.kp', [7.5, 10])
        // Добавляем фильтр для поиска фильмов с постером
        .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
        // Добавим страны
        .filterExact('countries.name', 'США')
        .filterExact('countries.name', 'Россия')
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
};
</script>

<style lang="scss">
.wrapMovie{
    img{
        width: 100px;
        height: 100px;
        image-rendering: -moz-crisp-edges; 
    }
}
</style>
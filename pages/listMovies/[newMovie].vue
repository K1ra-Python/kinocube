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
    <div>
        <h2>Выберите жанры:</h2>
        <div v-for="genre in allGenres" :key="genre">
            <input type="checkbox" :value="genre" :id="genre" :checked="selectedGenres.includes(genre)"
                @change="handleGenreChange(genre)" />
            <label :for="genre">{{ genre }}</label>
        </div>
        <button @click="ssearchMovies">Поиск фильмов</button>
    </div>
    <div v-if="movieDetails" class="movie-details">
        <h1>{{ movieDetails.title }}</h1>
        <!-- И другие детали фильма -->
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
import { useSelectedGenres } from '~/composables/selectedGenres'

// Здесь ваш клиентский API ключ
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const router = useRouter();
const movieDetails = ref(null);
const route = useRoute()
const genres = useSelectedGenres()
const movies = ref([]);
const allGenres = ref(['мелодрама', 'драма', 'комедия', 'ужасы', 'фантастика']);
const { selectedGenres, addOrRemoveGenre } = useSelectedGenres();
const filterSearch = async () => {
    // Кодируем жанры для URL
    const genreQuery = selectedGenres.value.map(genre => `genres.name=${encodeURIComponent(genre)}`).join('&');

    const url = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=1&${genreQuery}`;


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
        if (docs.length > 0) {
            const selectedMovie = docs[0]; // выбираем первый фильм в списке, можно изменить логику
            router.push({ path: `/listMovies/${selectedMovie.id}`, 
            query: { genres: selectedGenres.value.join(',') } });

        }
    } catch (error) {
        console.error("Произошла ошибка при выполнении запроса: ", error);
    }
}
const movieId = route.params.id; // Вытаскиваем ID фильма из URL.
const genresQueryString = route.query.genres; // Вытаскиваем строку жанров из URL.
console.log(movieId,genresQueryString);
function handleGenreChange(genre) {
    addOrRemoveGenre(genre);
}

// Функция для выполнения поиска фильмов с выбранными жанрами
function ssearchMovies() {
    filterSearch();
    // здесь ваша логика фильтрации или показа результатов
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
        //moviess.value = docs
    }

    // Если будет ошибка, то выведем ее в консоль
    if (error) console.log(error, message);
};

const getMovieById = async (movieId) => {
    try {
        const { data, error, message } = await kp.movie.getById(movieId);

        if (error) {
            console.log(error, message);
            return;
        }

        if (data) {
            movieDetails.value = data; // Обновляем реактивное состояние фильмом
            console.log(data);
        }
    } catch (error) {
        console.log('Ошибка получения фильма:', error);
    }
};
onMounted(() => {
    const movieName = decodeURIComponent(route.params.newMovie);
    searchMovies(movieName);
    console.log(movieName);
    //getRelatedByQueryBuilderMovies()
    //filterSearch();
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
  
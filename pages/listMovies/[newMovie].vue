<template>
    <div class="fullWrapFlex">
        <div class="filterGenres">
            <h2>Выберите жанры:</h2>
            <div v-for="genre in allGenres" :key="genre">
                <input type="checkbox" :value="genre" :id="genre" :checked="selectedGenres.includes(genre)"
                    @change="handleGenreChange(genre)" />
                <label :for="genre">{{ genre }}</label>
            </div>
            <button @click="ssearchMovies">Поиск фильмов</button>
        </div>
        <div v-if="movieDetails" class="movie-details">
            <div class="movePoster">
                <img v-if="movieDetails && movieDetails.poster" :src="movieDetails.poster.url" width="259" height="349">
            </div>
            <div class="wrapMovieDetails">
                <div class="moveDetailsGenre">
                    <span v-for="(genre, index) in movieDetails.genres" :key="index">
                        {{ genre.name }}<span v-if="index < movieDetails.genres.length - 1">, </span>
                    </span>
                </div>
                <div class="moveDetailsName">
                    {{ movieDetails.name }} ({{ movieDetails.year }})
                    {{ movieDetails.alternativeName }}
                </div>
                <div class="moveDetailsDiscrp">
                    {{ movieDetails.discription }}
                </div>
            </div>

            <!-- И другие детали фильма -->
        </div>
        <div class="buttonsGudOrNah">
            <button @click="displayNextMovie">
                <img src="~/assets/ok.svg">
            </button>
            <button>
                <img src="~/assets/like.svg">
            </button>
            <button>
                <img src="~/assets/notOk.svg">
            </button>
        </div>
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
import { useState } from '#app';
// Здесь ваш клиентский API ключ
const movies = useState('movies', () => []);
const currentMovieIndex = useState('currentMovieIndex', () => 0);
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const router = useRouter();
const movieDetails = ref(null);
const route = useRoute()
const genres = useSelectedGenres()
//const movies = ref([]);
const allGenres = ref(['мелодрама', 'драма', 'комедия', 'ужасы', 'фантастика']);
//const currentMovieIndex = ref(0); // текущий индекс в массиве docs
const { selectedGenres, addOrRemoveGenre } = useSelectedGenres();
const filterSearch = async () => {
    // Кодируем жанры для URL
    console.log(selectedGenres.value)
    currentMovieIndex.value = 0;
    const genreFilters = selectedGenres.value.map(genre => `genres.name=${encodeURIComponent(genre)}`).join('&');
    const url = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&${genreFilters}`;
    //https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&
    //genres.name=%D0%B4%D1%80%D0%B0%D0%BC%D0%B0&genres.name=%D1%83%D0%B6%D0%B0%D1%81%D1%8B&genres.name=%D0%BA%D0%BE%D0%BC%D0%B5%D0%B4%D0%B8%D1%8F
    //http://localhost:3000/listMovies/5581330?genres=%D0%BC%D0%B5%D0%BB%D0%BE%D0%B4%D1%80%D0%B0%D0%BC%D0%B0,%D0%BA%D0%BE%D0%BC%D0%B5%D0%B4%D0%B8%D1%8F

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
        if (data && Array.isArray(data.docs)) {
            movies.value = data.docs;
            currentMovieIndex.value = 0; // Индекс стартует с 0
            console.log(`Фильмы загружены.Всего фильмов: ${ movies.value.length }`);
            displayNextMovie(); // Перед этим не было инкремента, так что показываем первый фильм
        } else {
            console.log('Фильмы по заданным критериям не найдены');
            movies.value = []; // Явно устанавливаем пустой массив, если нет фильмов
        }
    } catch (error) {
        console.error("Произошла ошибка при выполнении запроса: ", error);
    }
}
//КАККККККК МНЕ БЛЯЯЯЯЯЯЯЯЯЯТЬ ПЕРЕДТЬ В ЭТУ ЕБУЧАЮ ФУНКЦИЮ МАССИВ С ОБХЕКТАМИ КОГДА Я ПЕРЕДАЮ ОН ПИШЕТ АНДЕФАЙНД БЛЯЯЯЯТЬ
function displayNextMovie() {
    console.log(`Текущий индекс до увеличения: ${currentMovieIndex.value}`);
    console.log(`Всего фильмов: ${movies.value.length}`);

    // Увеличиваем индекс для следующего фильма
    currentMovieIndex.value++;

    if (currentMovieIndex.value < movies.value.length) {
        // Показываем следующий фильм из списка
        const selectedMovie = movies.value[currentMovieIndex.value];
        console.log(`Переходим к фильму с индексом: ${currentMovieIndex.value}, ID: ${selectedMovie.id}`);
        router.push({
            path: `/listMovies/${selectedMovie.id}`,
            query: { genres: selectedGenres.value.join(',') },
        });
    } else {
        console.log('Больше фильмов нет');
        // Сброс индекса, если достигли конца массива
        currentMovieIndex.value = 0;
    }
}
const searchMovies = async () => {
    const queryBuilder = new MovieQueryBuilder();
    // Создаем запрос для поиска фильмов по подходящих под наш запрос
    const query = queryBuilder
        // Указываем что хотим получить фильм под названием Аватар вышедший в 2022
        .query('Аватар 2022')
        // Добавляем пагинацию и получаем 1 страницу по с 10 фильмами на странице
        .paginate(1, 10)
        // Собираем запрос
        .build();

    const { data, error, message } = await kp.movie.getBySearchQuery(query);

    if (data) {
        const { docs, page, limit } = data;
        console.log(`Страница ${page} из ${limit}`);
        console.log(docs);
    }

    // Если будет ошибка, то выведем ее в консоль
    if (error) console.log(error, message);
};

const genresQueryString = route.query.genres; // Вытаскиваем строку жанров из URL.
console.log(genresQueryString);
function handleGenreChange(genre) {
    addOrRemoveGenre(genre);
}

// Функция для выполнения поиска фильмов с выбранными жанрами
function ssearchMovies() {
    currentMovieIndex.value = -1
    filterSearch();
    // здесь ваша логика фильтрации или показа результатов
}

/*Эта асинхронная функция отвечает за показ первого рандомного фильма, дабы внести разнообразие в подборку для пользователя*/

const getMovieById = async (movieId) => {
    try {
        const { data, error, message } = await kp.movie.getById(movieId);

        if (error) {
            console.error("Ошибка получения данных о фильме:", message);
            return;
        }

        if (data) {
            movieDetails.value = data; // Обновляем реактивное состояние данными о фильме
            console.log("Подробности фильма:", data);
        }
    } catch (error) {
        console.error("Непредвиденная ошибка при получении фильма:", error);
    }
};
onMounted(() => {
    // Получаем идентификатор фильма из параметров маршрута
    const movieId = decodeURIComponent(route.params.newMovie);
    if (movieId) {
        // Вызов функции с правильным идентификатором
        getMovieById(movieId);
    } else {
        console.error("Не удалось получить идентификатор фильма из параметров маршрута");
    }
});
</script>
<style lang="scss">
.fullWrapFlex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
    color:white;
}

.logo {
    margin-top: -50px;
}

.glassFrame {
    width: 973px;
    height: 809px;
}

.filterGenres {
    position: absolute;
    margin-left: 1000px;
}

.movie-details {
    display: flex;
    gap: 40px;
    margin-bottom: 30%;

    .movePoster {
        margin-left: -80px;
    }

    img {
        border-radius: 20px;
    }
}

.buttonsGudOrNah {
    display: flex;
    gap: 70px;

    button {
        background-color: rgb(0, 0, 0, 0);
        border: none;
        cursor: pointer;
    }
}
</style>
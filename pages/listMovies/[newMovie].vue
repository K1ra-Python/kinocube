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
        <!--
        <div v-for="movie in movies" :key="movie.id">
            {{ movie.name }}
        </div>
        <div class="m" v-if="movies">
            {{ movies.name }}
        </div>
    -->
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
import { watch } from 'vue';
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
const currentPage = ref(1);
const filterSearch = async (page = currentPage.value) => {
    // Кодируем жанры для URL
    console.log(selectedGenres.value)
    currentMovieIndex.value = 0;
    const genreFilters = selectedGenres.value.map(genre => `genres.name=${encodeURIComponent(genre)}`).join('&');
    const url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=250&notNullFields=names.name&notNullFields=description&notNullFields=slogan&notNullFields=poster.url&notNullFields=year&status=completed&${genreFilters}`;

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
            console.log(`Фильмы загружены.Всего фильмов: ${movies.value.length}`);
            displayNextMovie(); // Перед этим не было инкремента, так что показываем первый фильм
        } else {
            console.log('Фильмы по заданным критериям не найдены');
            movies.value = []; // Явно устанавливаем пустой массив, если нет фильмов
        }
    } catch (error) {
        console.error("Произошла ошибка при выполнении запроса: ", error);
    }
}

async function displayNextMovie() {
    console.log(`Текущий индекс до увеличения: ${currentMovieIndex.value}`);
    console.log(`Всего фильмов: ${movies.value.length}`);

    // Если мы достигли конца списка фильмов, запрашиваем следующую страницу
    if (currentMovieIndex.value >= movies.value.length - 1) {
        // Запрашиваем следующую страницу
        await loadNextPage();
    } else {
        // Показываем следующий фильм из списка
        currentMovieIndex.value++;
        const selectedMovie = movies.value[currentMovieIndex.value];
        console.log(`Переходим к фильму с индексом: ${currentMovieIndex.value}, ID: ${selectedMovie.id}`);
        router.push({
            path: `/listMovies/${selectedMovie.id}`,
            query: { genres: selectedGenres.value.join(',') },
        });
    }
}

async function loadNextPage() {
    // Увеличиваем номер текущей страницы
    currentPage.value++;
    // Загружаем новую страницу
    await filterSearch(currentPage.value);
}


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
/*
watch(() => route.params.newMovie, (newMovieId, oldMovieId) => {
      if (newMovieId !== oldMovieId) {
        // Вызываем функцию, например, для загрузки новых данных фильма,
        // основываясь на новом значении параметра маршрута
        getMovieById(newMovieId);
        displayNextMovie();
      }
    });*/
onMounted(() => {
    //ssearchMovies();
    // Получаем идентификатор фильма из параметров маршрута
    const movieId = decodeURIComponent(route.params.newMovie);
    if (movieId) {
        // Вызов функции с правильным идентификатором
        getMovieById(movieId);

    } else {
        console.error("Не удалось получить идентификатор фильма из параметров маршрута");
    }
    //ssearchMovies();
    
});

</script>
<style lang="scss">
.fullWrapFlex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
    color: white;
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
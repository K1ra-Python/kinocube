<template>
    <div class="fullWrapFlex">
        <div class="movie-details2">
            <div v-for="movie in movies" :key="movie.id" class="wrapMovie">
                {{ movie.name }}
                <img v-if="movieDetails && movieDetails.poster" :src="movieDetails.poster.url" width="259" height="349">
            </div>
            <!-- Ваша форма и описание фильма здесь -->
        </div>
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
                </div>
                <div class="moveDetailsDiscrp">
                    {{ movieDetails.discription }}
                </div>
            </div>

            <!-- И другие детали фильма -->
        </div>
        <div class="buttonsGudOrNah">
            <button @click="filterSearch()">
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

// Здесь ваш клиентский API ключ
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const router = useRouter();
const movieDetails = ref(null);
const route = useRoute()
const genres = useSelectedGenres()
const movies = ref([]);
const allGenres = ref(['мелодрама', 'драма', 'комедия', 'ужасы', 'фантастика']);
const currentMovieIndex = ref(0); // текущий индекс в массиве docs
const { selectedGenres, addOrRemoveGenre } = useSelectedGenres();
const filterSearch = async () => {
    // Кодируем жанры для URL
    currentMovieIndex.value = 0;
    const genreFilters = selectedGenres.value.map(genre => `genre.name=${encodeURIComponent(genre)}`).join('&');
    const url = `https://api.kinopoisk.dev/v1.4/movie?page=10&limit=10&${genreFilters}`;

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
        if (docs.length > 0) {
            movies.value = docs;
            displayNextMovie(); // Показываем первый фильм в списке
        } else {
            console.log('Фильмы по заданным критериям не найдены');
        }
    } catch (error) {
        console.error("Произошла ошибка при выполнении запроса: ", error);
    }
}
function displayNextMovie() {
    if (currentMovieIndex.value < movies.value.length) {
        const selectedMovie = movies.value[currentMovieIndex.value];
        router.push({
            path: `/listMovies/${selectedMovie.id}`,
            query: { genres: selectedGenres.value.join(',') },
        });
        currentMovieIndex.value++; // Увеличиваем индекс для следующего вызова
    } else {
        console.log('Больше фильмов нет');
        // Сброс индекса, если достигли конца массива
        currentMovieIndex.value = 0;
    }
}
const genresQueryString = route.query.genres; // Вытаскиваем строку жанров из URL.
console.log(genresQueryString);
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

const getMovieById = async (movieName) => {
    try {
        const { data, error, message } = await kp.movie.getById(movieName);

        if (error) {
            console.log(error, message);
            return;
        }

        if (data) {
            const { docs, page, limit } = data;
            movieDetails.value = data; // Обновляем реактивное состояние фильмом
            console.log(data);
            movies.value = docs
        }
    } catch (error) {
        console.log('Ошибка получения фильма:', error);
    }
};
onMounted(() => {
    const movieName = decodeURIComponent(route.params.newMovie);
    searchMovies(movieName);
    getMovieById(movieName)
    //id фильма
    console.log(movieName);
    //getRelatedByQueryBuilderMovies()
    //filterSearch();
});
</script>
<style lang="scss">
.fullWrapFlex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
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
<template>
    <div class="reser_or_show_filters">
        <div class="show_filters">
            <button @click="showFiltres" :style="{ background: activeBgColor, color: activeColor }">Показать
                фильтры</button>
        </div>
        <div class="button_reset_filtres">
            <button @click="resetFilters">Сбросить фильтры</button>
        </div>
    </div>
    <div class="fullWrapFlex">
        <div class="genres_box" v-show="isFiltres == true">
            <div class="filterGenres">
                <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
                    <symbol id="checkmark" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-miterlimit="10" fill="none" d="M22.9 3.7l-15.2 16.6-6.6-7.1">
                        </path>
                    </symbol>
                </svg>
                <h2>Выберите жанры:</h2>
                <div v-for="genre in allGenres" :key="genre" class="promoted-checkbox">
                    <input type="checkbox" :value="genre" :id="genre" :checked="selectedGenres.includes(genre)"
                        class="promoted-input-checkbox" @change="handleGenreChange(genre)" />
                    <label :for="genre">
                        <svg>
                            <use xlink:href="#checkmark" />
                        </svg>
                        {{ genre }}</label>
                </div>

            </div>
            <div class="filterCountries">
                <h2>Выберите страну:</h2>
                <select v-model="selectedCountry">
                    <option v-for="country in allCountries" :key="country" :value="country">{{ country }}</option>
                </select>
            </div>
            <button @click="ssearchMovies" class="setFiltres">Применить фильтры</button>
        </div>
        <div v-if="movieDetails" class="movie-details">
            <div class="movePoster">
                <img v-if="movieDetails && movieDetails.poster" :src="movieDetails.poster.url" width="259" height="349">
                <img v-if="movieDetails && movieDetails.cover" :src="movieDetails.cover.url" width="259" height="349">
            </div>
            <div class="wrapMovieDetails">
                <div class="moveDetailsGenre">
                    <span v-for="(genre, index) in movieDetails.genres" :key="index">
                        {{ genre.name }}<span v-if="index < movieDetails.genres.length - 1">, </span>
                    </span>
                </div>
                <div class="moveDetailsName">
                    <div class="name_and_year">
                        {{ movieDetails.name }} ({{ movieDetails.year }})
                    </div>
                    <div class="alt_name" v-if="!movieDetails.name">
                        {{ movieDetails.alternativeName }}
                    </div>

                </div>
                <div class="moveDetailsDescrp">
                    {{ movieDetails.description }}
                </div>
            </div>
        </div>
        <div v-if="moviesImages.length > 0">
            <div class="mg" v-for="image in moviesImages.slice(0, 3)" :key="image.id">
              {{ image.type }}
              <img :src="image.url" :alt="'Скриншот ' + image.movieId" :width="239" :height="239">
            </div>
          </div>
        <div class="buttonsGudOrNah">
            <button @click="displayNextMovie">
                <img src="~/assets/ok.svg">
            </button>
            <button @click="likedTitle">
                <img src="~/assets/like.svg">
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

import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSelectedGenres } from '~/composables/selectedGenres'
import { useState } from '#app';
import { ref } from 'vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';


// Здесь ваш клиентский API ключ
const movies = useState('movies', () => []);
const currentMovieIndex = useState('currentMovieIndex', () => 0);
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');
const router = useRouter();
const movieDetails = ref(null);
const moviesImages = ref([])
const route = useRoute();
const genres = useSelectedGenres();
const selectedCountry = ref(''); // Выбранная страна
const allCountries = ref(['США', 'Франция', 'Германия', 'Япония']); // Доступные страны
const allGenres = ref(['мелодрама', 'драма', 'комедия', 'ужасы', 'фантастика', 'криминал', 'вестерн']);
const { selectedGenres, addOrRemoveGenre } = useSelectedGenres();
const currentPage = ref(1);
const isFiltres = ref(false);
const activeBgColor = ref('');
const activeColor = ref('');
const auth = getAuth();
const db = getFirestore();
const resetFilters = () => {

    selectedCountry.value = ''; // Сбрасываем выбранную страну
    selectedGenres.value = [];

    filterSearch(); // Выполнить новый поиск с обновленными параметрами
};
const filterSearch = async (page = currentPage.value) => {
    // Кодируем жанры для URL
    console.log(selectedGenres.value)
    currentMovieIndex.value = 0;
    const countryFilter = selectedCountry.value
        ? `&countries.name=${encodeURIComponent(selectedCountry.value)}`
        : '';
    const genreFilters = selectedGenres.value.length > 0
        ? `&genres.name=${selectedGenres.value.map(encodeURIComponent).join('&')}`
        : '';
    //const genreFilters = selectedGenres.value.map(genre => `genres.name=${encodeURIComponent(genre)}`).join('&');
    const url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=250&notNullFields=names.name&notNullFields=description&notNullFields=slogan&notNullFields=poster.url&notNullFields=year&status=completed&${genreFilters}&${countryFilter}`;

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
const getImg = async () => {
    // Кодируем жанры для URL
    const url = `https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&movieId=${435}&type=cover&type=frame&type=screenshot&type=shooting`;

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
        moviesImages.value = data.docs;
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
const showFiltres = () => {
    isFiltres.value = !isFiltres.value;
    activeBgColor.value = activeBgColor.value === 'rgba(255, 255, 255, 0.5)' ? '' : 'rgba(255, 255, 255, 0.5)';
    activeColor.value = activeColor.value === 'black' ? '' : 'black';
}

const likedTitle = async () => {
    const movieId = decodeURIComponent(route.params.newMovie);

    if (!auth.currentUser) {
        console.error('Пользователь не авторизован');
        return; // или выполнить перенаправление на страницу входа
    }

    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, 'users', userId);

    try {
        // Добавляем movieId в массив 'favorites' в Firestore
        await updateDoc(userDocRef, {
            favorites: arrayUnion(movieId)
        });

        console.log(`Фильм с ID ${movieId} добавлен в избранное пользователя с ID ${userId}`);
    } catch (error) {
        console.error('Ошибка при добавлении фильма в избранное:', error);
    }
};
onMounted(() => {
    //ssearchMovies();
    // Получаем идентификатор фильма из параметров маршрута
    const movieId = decodeURIComponent(route.params.newMovie);
    if (movieId) {
        // Вызов функции с правильным идентификатором
        getMovieById(movieId);
        getImg(movieId);

    } else {
        console.error("Не удалось получить идентификатор фильма из параметров маршрута");
    }
    //ssearchMovies();

});

</script>
<style lang="scss">
@mixin buttonFilterOffOn {
    cursor: pointer;
    border: none;
    border: 0.24px solid rgba(0, 0, 0, 0.1);
    border-radius: 0 9px 9px 0;
    width: 120px;
    height: 120px;
    color: white;
    backdrop-filter: blur(4.672276973724365px);
    background: rgba(0, 0, 0, 0.5);
}

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
    padding: 26px 140px;
    width: 973px;
    height: 909px;
}

.wrapMovieDetails {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.movie-details {
    display: flex;
    gap: 40px;
    margin-bottom: 30%;
    justify-content: center;
  

    .moveDetailsName {
        display: flex;
        flex-direction: column;
    }

    .movePoster {}

    img {
        border-radius: 20px;
        width: 259px;
        height: 349px;
    }

    .moveDetailsGenre {
        span {
            font-style: italic;
            font-weight: 300;
            font-size: 20px;
            color: #fff;
        }
    }

    .moveDetailsDescrp {
        font-style: italic;
        font-weight: 700;
        font-size: 18px;
        color: #fff;
        max-width: 500px;
    }
}

.buttonsGudOrNah {
    display: flex;
    gap: 70px;
    justify-content: center;

    button {
        background-color: rgb(0, 0, 0, 0);
        border: none;
        cursor: pointer;
    }
}

.reser_or_show_filters {
    margin-left: 113%;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.show_filters {


    button {
        @include buttonFilterOffOn;
    }

}

.button_reset_filtres {



    button {
        @include buttonFilterOffOn;
    }

}

.genres_box {
    border: 1px solid rgba(255, 255, 255, 0.44);
    backdrop-filter: blur(15px);
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 10px;
    width: 500px;
    gap: 30px;
    justify-content: center;


}

$brand: #161616;
$grey-25: #161616;
$grey-5: #161616;

*,
*:before,
*:after {
    box-sizing: border-box;
}

.form-container {
    padding: 1rem;
    margin: 2rem auto;
    background-color: $grey-5;
    border: 1px solid $grey-25;
    width: 50%;
}

/* HTML5 Boilerplate accessible hidden styles */
.promoted-input-checkbox {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;

}

.promoted-checkbox {
    padding: 1%;

    input:checked+label>svg {
        // Firefox doesn't render svg's that is loading with the use tag if its been set to display: none and then toggled to display: block, so you have to use tricks like this to get it to render again:
        height: 24px;
        animation: draw-checkbox ease-in-out 0.2s forwards;
    }

    label:active::after {

        background-color: $grey-25;
    }

    label {
        font-weight: 400;
        font-size: 20px;
        color: #fff;
        line-height: 40px;
        cursor: pointer;
        position: relative;

        &:after {
            content: "";
            height: 40px;
            width: 40px;
            margin-right: 1rem;
            float: left;
            border: 2px solid $brand;
            border-radius: 3px;
            transition: 0.15s all ease-out;
        }
    }

    svg {
        stroke: $brand;
        stroke-width: 3px;
        height: 0; //Firefox fix
        width: 24px;
        position: absolute;
        left: -48px;
        top: -4px;
        stroke-dasharray: 33; //Firefox fix
    }
}

@keyframes draw-checkbox {
    0% {
        stroke-dashoffset: 33;
    }

    100% {
        stroke-dashoffset: 0;
    }
}

.setFiltres {
    cursor: pointer;
    border: none;
    border-radius: 9px 9px 9px 9px;
    width: 120px;
    height: 50px;
    color: white;
    backdrop-filter: blur(4.672276973724365px);
    background: rgba(0, 0, 0, 0.5);
    align-self: center;
}
</style>
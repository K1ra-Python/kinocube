<template>
  <div>
    <h1>Детали избранного</h1>
    <p>ID избранного: {{ favoriteId }}</p>
    <div v-for="(movieDetail, index) in movieDetails" :key="index">
      <div>
        <!-- Теперь отображаем информацию о фильме вместо ID -->
        <div class="mWrap">
          <!-- Замените 'poster' и 'name' на правильные названия свойств из вашего объекта данных о фильме -->
          <div class="head">
            <div class="mPoster">
              <img v-if="movieDetail && movieDetail.poster" :src="movieDetail.poster.url" width="259" height="349">
            </div>
            <div class="headText">
              <div class="nameAndYear">
                <div class="mName">
                  <div class="originalName" v-if="movieDetail.name != null">
                    {{ movieDetail.name }}
                  </div>
                  <div v-else class="altName">
                    {{ movieDetail.alternativeName }}
                  </div>
                </div>
                <div class="mYear">
                  ({{ movieDetail.year }} год)
                </div>
              </div>
              <div class="mDescription" v-if="movieDetail.description != null">
                <span>{{ movieDetail.description }}</span>
              </div>
            </div>
          </div>
          <div class="aboutTitle">
            <div class="more">Подробней о фильме</div>
            <div class="wrapAbout">
              <div class="countrys">
                <div class="country">Страна: </div>
                <div class="countryName"> <span v-for="(countries, index) in movieDetail.countries" :key="index">
                    {{ countries.name }}<span v-if="index < movieDetail.countries.length - 1">, </span>
                  </span></div>
              </div>
              <div class="genres">
                <div class="genre">Жанры: </div>
                <div class="genresName">
                  <span v-for="(genre, index) in movieDetail.genres" :key="index">
                    {{ genre.name }}<span v-if="index < movieDetail.genres.length - 1">, </span>
                  </span>
                </div>
              </div>
              <div class="money">
                <div class="budget">Бюджет: </div>
                <div class="theBudget"> {{ movieDetail.budget.value }}{{ movieDetail.budget.currency }} </div>
              </div>
              <div class="director">
                <div class="dirctr">Продюсер: </div>
                <div class="directorName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'режиссеры'">
                      {{ persons.name }}
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'director'">
                      {{ persons.enName }}
                    </div>
                  </span>
                </div>
              </div>
              <div class="writer">
                <div class="wrtr">Сценарист: </div>
                <div class="writerName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'редакторы'">
                      {{ persons.name }}
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'writer'">
                      {{ persons.enName }}
                    </div>
                  </span>
                </div>
              </div>
              <div class="producer">
                <div class="prcr">Продюсер: </div>
                <div class="producerName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'продюсеры'">
                      {{ persons.name }}
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'producer'">
                      {{ persons.enName }}
                    </div>
                  </span>
                </div>
              </div>
              <div class="operator">
                <div class="oprtr">Оператор: </div>
                <div class="operatorName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'операторы'">
                      {{ persons.name }}
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'operator'">
                      {{ persons.enName }}
                    </div>
                  </span>
                </div>
              </div>
              <div class="compositor">
                <div class="cmpstr">Композитор: </div>
                <div class="compositorName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'композиторы'">
                      {{ persons.name }}
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'compositor'">
                      {{ persons.enName }}
                    </div>
                  </span>
                </div>
              </div>
              <div class="designer">
                <div class="dsgnr">Художник: </div>
                <div class="designerName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'художники'">
                      {{ persons.name }}
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'designer'">
                      {{ persons.enName }}
                    </div>
                  </span>
                </div>
              </div>
              <div class="editor">
                <div class="edtr">Художник: </div>
                <div class="editorName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'монтажеры'">
                      {{ persons.name }}
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'editor'">
                      {{ persons.enName }}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mTypes">
            <div v-if="movieDetail.type == 'tv-series'">тв серии</div>
            <div v-if="movieDetail.type == 'movie'">фильм</div>
            <div v-if="movieDetail.type == 'cartoon'">мульт</div>
            <div v-if="movieDetail.type == 'anime'">аниме</div>
            <div v-if="movieDetail.type == 'animate-series'">анимационный сериал</div>
          </div>
          <div class="mStatus" v-if="movieDetail.status != null">
            <div class="statusComp" v-if="movieDetail.status == 'completed'">
              Статус: Завершён
            </div>
            <div class="statusComp" v-if="movieDetail.status == 'filmed'">
              Статус: Продолжается
            </div>
          </div>
          <div class="mSlogan" v-if="movieDetail.slogan != null">
            {{ movieDetail.slogan }}
          </div>
          <div class="mRating" v-if="movieDetail.rating">
            <div class="ratings">
              <div class="rKP">
                {{ movieDetail.rating.kp }}
              </div>
              <div class="rIMDB">
                {{ movieDetail.rating.imdb }}
              </div>

            </div>
          </div>
          <div class="mAgeRating" v-if="movieDetail.ageRating != null">
            {{ movieDetail.ageRating }}
          </div>
          <div class="mGenres">

          </div>

          <div class="mWatch">
            <div v-for="(item, index) in movieDetail.watchability.items" :key="index">
              <a :href="item.url" target="_blank">
                <img :src="item.logo.url" :alt="item.name" width="259" height="349">
                <span>{{ item.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
const route = useRoute();
const favoriteId = route.params.id; // Получаем id из параметров маршрута


const db = getFirestore();
const auth = getAuth();
const router = useRouter();
const userProfile = ref({});
const userFavorites = ref([]);
const movieDetails = ref([]);
const kp = new KinopoiskDev('Y5W270D-51F4EHG-KW5T65G-H56CJ96');

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
onMounted(async () => {
  await onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      const userDocRef = doc(db, 'users', authUser.uid);
      try {
        getMovieById(favoriteId);
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
<style lang="scss">
body {
  margin: 0;
  padding: 0;

  .wrap {
    margin-top: 0%;
    height: 100%;

    .glassFrame {
      border-radius: 0;
    }
  }
}

.mWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mPoster {
  img {
    border-radius: 15px;
  }

}

.nameAndYear {
  display: flex;
  align-items: end;
  font-weight: 500;
  font-size: 40px;
  color: #fff;
  gap: 25px;
  margin-bottom: 5%;
  line-height: 33px;
  text-shadow: 2px 1px 2px rgb(7, 7, 7);

  .mYear {
    font-weight: 400;
    font-size: 30px;
    color: #fff;
  }
}

.head {
  justify-content: space-between;
  display: flex;
  gap: 120px;
  margin-left: 20%;
}

.mDescription {
  display: flex;

  span {
    text-shadow: 2px 1px 2px rgb(7, 7, 7);
    line-height: 33px;
    width: 950px;
    font-weight: 500;
    font-size: 25px;
    color: #fbfbfb;
  }

}

.aboutTitle {
  .more {
    font-weight: 500;
    font-size: 35px;
    color: #fff
  }
}

.wrapAbout {
  text-shadow: 2px 1px 2px rgb(7, 7, 7);
  div {
    display: flex;
    font-weight: 500;
    font-size: 30px;
    color: #fff;
    line-height: 33px;
  }
}

@mixin gaps{
  padding: 0px 0px 25px 0px;
  display: flex;
  gap: 320px;
  div{
    display: flex;
  }
}
.countrys{
@include gaps;
}
.genres{
  @include gaps;
}
.money{
  @include gaps;
}
.director{
  @include gaps;
}
.writer{
  @include gaps;
}
.producer{
  @include gaps;
}
.operator{
  @include gaps;
}
.compositor{
  @include gaps;
}
.designer{
  @include gaps;
}
.editor{
  @include gaps;
}
</style>
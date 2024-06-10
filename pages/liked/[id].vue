<template>
  <div>
    <div v-for="(movieDetail, index) in movieDetails" :key="index">
      <div>
        <!-- Теперь отображаем информацию о фильме вместо ID -->
        <div class="mWrap">
          <!-- Замените 'poster' и 'name' на правильные названия свойств из вашего объекта данных о фильме -->
          <div class="head">
            <div class="mPoster">
              <img v-if="movieDetail && movieDetail.poster" :src="movieDetail.poster.url" width="259" height="349">
              <div class="mRating" v-if="movieDetail.rating">
                <div class="ratings">
                  <div class="rKP">
                    <div class="epic" v-if="movieDetail.rating.kp > 9" style="color: #fcdf3b;"><span
                        style="color: #fff;">Кинопоиск:</span>{{ movieDetail.rating.kp }}</div>
                    <div class="good" v-else-if="movieDetail.rating.kp < 9 && movieDetail.rating.kp > 5"
                      style="color: #3bb33b;"><span style="color: #fff;">Кинопоиск:</span> {{ movieDetail.rating.kp }}
                    </div>
                    <div class="mid" v-else-if="movieDetail.rating.kp < 5 && movieDetail.rating.kp > 4"
                      style="color: #767571;"><span style="color: #fff;">Кинопоиск:</span>{{ movieDetail.rating.kp }}
                    </div>
                    <div class="bad" v-else style="color: #9e1515;"><span style="color: #fff;">Кинопоиск:</span>{{
                      movieDetail.rating.kp }}</div>
                  </div>
                  <div class="rIMDB">
                    <div class="epic" v-if="movieDetail.rating.imdb > 9" style="color: #fcdf3b;">
                      {{ movieDetail.rating.imdb }}</div>
                    <div class="good" v-else-if="movieDetail.rating.imdb < 9 && movieDetail.rating.imdb > 5"
                      style="color: #3bb33b;"><span style="color: #fff;">IMDB:</span> {{ movieDetail.rating.imdb }}</div>
                    <div class="mid" v-else-if="movieDetail.rating.imdb < 5 && movieDetail.rating.imdb > 4"
                      style="color: #767571;"><span style="color: #fff;">IMDB:</span>{{ movieDetail.rating.imdb }}</div>
                    <div class="bad" v-else style="color: #9e1515;"><span style="color: #fff;">IMDB:</span>{{
                      movieDetail.rating.imdb }}</div>
                  </div>

                </div>
              </div>
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
              <div class="mStatus" v-if="movieDetail.status != null">
                <div class="statusComp" v-if="movieDetail.status == 'completed'">
                  Статус: Завершён
                </div>
                <div class="statusComp" v-if="movieDetail.status == 'filmed'">
                  Статус: Продолжается
                </div>
              </div>
              <div class="mDescription" v-if="movieDetail.description != null">
                <span>{{ movieDetail.description }}</span>
              </div>
            </div>
          </div>
          <div class="aboutTitle">
            <div class="more"><span>Подробней о</span>
              <div v-if="movieDetail.type == 'tv-series'"> сериале</div>
              <div v-if="movieDetail.type == 'movie'"> фильме</div>
              <div v-if="movieDetail.type == 'cartoon'">мультике</div>
              <div v-if="movieDetail.type == 'anime'"> аниме</div>
              <div v-if="movieDetail.type == 'animate-series'"> анимационном сериале</div>
            </div>
            <div class="wrapAbout">
              <div class="aboutName">
                <div class="country">Страна: </div>
                <div class="genre">Жанры: </div>
                <div class="budget">Бюджет: </div>
                <div class="dirctr">Режисер: </div>
                <div class="wrtr">Сценарист: </div>
                <div class="prcr">Продюсер: </div>
                <div class="oprtr">Оператор: </div>
                <div class="cmpstr">Композитор: </div>
                <div class="dsgnr">Художник: </div>
                <div class="edtr">Монтажёр: </div>
                <div class="edtr">Возрастной рейтинг: </div>
              </div>
              <div class="actuallyName">
                <div class="countryName"> <span v-for="(countries, index) in movieDetail.countries" :key="index">
                    {{ countries.name }}<span v-if="index < movieDetail.countries.length - 1">, </span>
                  </span></div>
                <div class="genresName">
                  <span v-for="(genre, index) in movieDetail.genres" :key="index">
                    {{ genre.name }}<span v-if="index < movieDetail.genres.length - 1">, </span>
                  </span>
                </div>
                <div class="theBudget" v-if="hasBudgets">
                  <div class="i" v-if="movieDetail.budget != null">
                    {{ movieDetail.budget.value }}{{ movieDetail.budget.currency }}.
                  </div>
                  <div v-else class="e">
                    ---
                  </div>
                </div>
                <div class="e" v-else> ---</div>
                <div class="directorName" v-if="hasDirectors">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'режиссеры'">
                      {{ persons.name }}.
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'director'">
                      {{ persons.enName }}.
                    </div>
                  </span>
                </div>
                <div class="e" v-else>
                  ---
                </div>
                <div class="writerName" v-if="hasWriters">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'редакторы'">
                      {{ persons.name }}.
                    </div>
                    <div class="mActorN" v-else-if="persons.enProfession == 'writer'">
                      {{ persons.enName }}.
                    </div>
                  </span>
                </div>
                <div class="e" v-else> ---</div>
                <div class="producerName" v-if="hasProducers">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'продюсеры'">
                      {{ persons.name }}.
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'producer'">
                      {{ persons.enName }}.
                    </div>
                  </span>
                </div>
                <div class="e" v-else>
                  ---
                </div>
                <div class="operatorName" v-if="hasOperators">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'операторы'">
                      {{ persons.name }}.
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'operator'">
                      {{ persons.enName }}.
                    </div>
                  </span>
                </div>
                <div class="e" v-else>---</div>
                <div class="compositorName" v-if="hasCompositors">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'композиторы'">
                      {{ persons.name }}.
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'compositor'">
                      {{ persons.enName }}.
                    </div>
                  </span>
                </div>
                <div class="e" v-else> ---</div>
                <div class="designerName" v-if="hasDesigner">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'художники'">
                      {{ persons.name }}.
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'designer'">
                      {{ persons.enName }}.
                    </div>
                  </span>
                </div>
                <div class="e" v-else>---</div>
                <div class="editorName" v-if="hasEditors">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'монтажеры'">
                      {{ persons.name }}.
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'editor'">
                      {{ persons.enName }}.
                    </div>
                  </span>
                </div>
                <div class="e" v-else>---</div>
                <div class="mAgeRating" v-if="hasRatings">
                  {{ movieDetail.ageRating }}.
                </div>
              </div>
            </div>
          </div>
          <div class="actors">
            <div class="inOrder">
              В главных ролях
            </div>
            <div class="realActors">
              <span v-for="(persons, index) in movieDetail.persons" :key="index">
                <div class="mActorN" v-if="persons.profession == 'актеры' || persons.profession == 'actor' ">
                  {{ persons.name }},({{ persons.enName }})
                </div>
              </span>
            </div>
          </div>
          <div class="Watch">
            <div class="where">
              <span>Где смотреть</span>
            </div>
            <div class="mWatch" v-if="movieDetail.watchability.items != []">
              <div class="kiok" v-for="(item, index) in movieDetail.watchability.items" :key="index">
                <a :href="item.url" target="_blank">
                  <img :src="item.logo.url" :alt="item.name" width="259" height="349">
                  <span>{{ item.name }}</span>
                </a>
              </div>
            </div>
            <div class="eblo" v-else>
Упс, пока что нигде
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
function createProfessionChecker(profession) {
  return computed(() => {
    return movieDetails.value.some(movie =>
      Array.isArray(movie.persons) && movie.persons.some(person =>
        person.profession === profession || person.enProfession === profession.toLowerCase()
      )
    );
  });
}
function hasValueChecker(getValue) {
  return computed(() => {
    return movieDetails.value.some(movie => getValue(movie) != null);
  });
}

// Здесь возьмем значение рейтинга и бюджета из каждого фильма
const hasRatings = hasValueChecker(movie => movie.rating);
const hasBudgets = hasValueChecker(movie => movie.budget);
const hasWriters = createProfessionChecker('редакторы');
const hasDirectors = createProfessionChecker('режиссеры');
const hasProducers = createProfessionChecker('продюсеры');
const hasOperators = createProfessionChecker('операторы');
const hasCompositors = createProfessionChecker('композиторы');
const hasDesigner = createProfessionChecker('художники');
const hasEditors = createProfessionChecker('монтажеры');

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
.mWrap {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mPoster {
  img {
    border-radius: 15px;
    box-shadow: -7px 6px 20px 0 rgba(191, 191, 191, 0.98), -27px 24px 36px 0 rgba(191, 191, 191, 0.85), -62px 53px 49px 0 rgba(191, 191, 191, 0.5), -110px 94px 58px 0 rgba(191, 191, 191, 0.15), -172px 147px 63px 0 rgba(191, 191, 191, 0.02);
  }

  div {
    font-size: 25px;
    text-shadow: 2px 1px 2px rgb(7, 7, 7);
  }

}

.nameAndYear {
  display: flex;
  align-items: end;
  font-size: 40px;
  color: #fff;
  gap: 25px;
  margin-bottom: 5%;
  line-height: 33px;
  text-shadow: 2px 1px 2px rgb(7, 7, 7);

  .mYear {

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

.mStatus {
  font-size: 25px;
  color: #fbfbfb;
  text-shadow: 2px 1px 2px rgb(7, 7, 7);
  margin-bottom: 2%;
}

.mDescription {
  display: flex;

  span {
    text-shadow: 2px 1px 2px rgb(7, 7, 7);
    line-height: 33px;
    width: 950px;

    font-size: 25px;
    color: #fbfbfb;
  }

}

.aboutTitle {
  margin-top: 15%;

  .more {
    margin-bottom: 5%;
    margin-left: 10%;
    font-size: 35px;
    color: #fff;
    display: flex;

    span {
      padding-right: 2%;
    }
  }
}

.wrapAbout {
  text-shadow: 2px 1px 2px rgb(7, 7, 7);
  display: flex;
  gap: 120px;
  margin-left: 15%;
}

.aboutName {
  display: flex;
  flex-direction: column;
  font-size: 25px;
  color: #fff;
  gap: 30px;
}

.actuallyName {
  display: flex;
  flex-direction: column;
  font-size: 25px;
  color: #fff;
  gap: 30px;
}

.writerName {
  display: flex;
  width: 1060px;
}

.directorName {
  width: 1060px;
  display: flex;
}

.operatorName {
  display: flex;
  width: 1060px;
}

.editorName {
  width: 1060px;
  display: flex;
}

.producerName {
  display: flex;
  width: 1060px;
}

.designerName {
  display: flex;
  width: 1060px;
}

.compositorName{
    display: flex;
    width: 1060px;
}
.actors {
  align-self: flex-start;
  margin-top: 10%;
}

.inOrder {
  text-shadow: 2px 1px 2px rgb(7, 7, 7);
  margin-bottom: 5%;
  margin-left: 20%;
  font-size: 35px;
  color: #fff
}

.realActors {
  margin-left: 30%;
  text-shadow: 2px 1px 2px rgb(7, 7, 7);
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  gap: 10px;
  font-size: 25px;
  color: #fff;
}

.Watch {
  margin-top: 10%;
  margin-left: 10%;
  align-self: flex-start;
}

.where {
  font-size: 35px;
  color: #fff
}

.mWatch {
  margin-top: 10%;
  margin-left: 10%;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  width: 900px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      color: #fff;
      text-decoration: none;

      img {
        width: 175px;
        height: 175px;
      }
    }
  }
}

.eblo{
  padding: 5%;
  margin-left: 250px;
  font-size: 25px;
  color: #fff;
  text-decoration: none;
}
</style>
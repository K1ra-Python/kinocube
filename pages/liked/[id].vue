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
                <div class="dirctr">Продюсер: </div>
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
                <div class="theBudget">
                  <div class="i" v-if="movieDetail.budget != null">
                    {{ movieDetail.budget.value }}{{ movieDetail.budget.currency }}
                  </div>
                  <div v-else class="e">
                    ---
                  </div>
                </div>
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
                <div class="writerName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'редакторы'">
                      {{ persons.name }},
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'writer'">
                      {{ persons.enName }},
                    </div>
                  </span>
                </div>
                <div class="producerName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'продюсеры'">
                      {{ persons.name }},
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'producer'">
                      {{ persons.enName }},
                    </div>
                  </span>
                </div>
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
                <div class="designerName">
                  <span v-for="(persons, index) in movieDetail.persons" :key="index">
                    <div class="mActorN" v-if="persons.profession == 'художники'">
                      {{ persons.name }},
                    </div>
                    <div v-else class="mActorN" v-if="persons.enProfession == 'designer'">
                      {{ persons.enName }},
                    </div>
                  </span>
                </div>
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
                <div class="mAgeRating" v-if="movieDetail.ageRating != null">
                  {{ movieDetail.ageRating }}
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
                <div class="mActorN" v-if="persons.profession == 'актеры'">
                  {{ persons.name }},
                </div>
                <div v-else class="mActorN" v-if="persons.enProfession == 'actor'">
                  {{ persons.enName }},
                </div>
              </span>
            </div>
          </div>
          <div class="Watch">
            <div class="where">
              <span>Где смотреть</span>
            </div>
            <div class="mWatch">
              <div class="kiok" v-for="(item, index) in movieDetail.watchability.items" :key="index">
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
  background-position: center center;
  background-attachment: local;
  background-repeat: repeat;

  .wrap {
    margin-top: 0%;
    height: 100%;

    .glassFrame {
      border-radius: 0;
    }
  }
}

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
.mStatus{
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
    span{
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
  width: 1000px;
}

.directorName{
  width: 1000px;
  display: flex;
}
.operatorName{
  display: flex;
  width: 1000px;
}
.editorName{
  width: 1000px;
  display: flex;
}
.producerName {
  display: flex;
  width: 1000px;
}

.designerName {
  display: flex;
  width: 1000px;
}

.actors{
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
.realActors{
  margin-left: 30%;
  text-shadow: 2px 1px 2px rgb(7, 7, 7);
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  gap:  10px;
  font-size: 25px;
  color: #fff;
}

.Watch{
  margin-top: 10%;
  margin-left: 10%;
  align-self: flex-start;
}
.where{
  font-size: 35px;
  color: #fff
}
.mWatch {
  margin-top: 10%;
  margin-left: 10%;
  display: flex;
  gap: 30px;
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
}</style>
<template>
    <div class="wrap">

        <header>
            <div class="logo">
                <img src="~/assets/logo.svg">
            </div>
        </header>
        <div class="con">
            
            
            <slot></slot>
        </div>
        <footer>
            <div class="tt">
                Веб приложение и дизайн разработано Гученко Максимом aka Kira
            </div>
          <div class="lend">
            Лендинговая страница https://k1ra-python.github.io/k1ra.github.io/
          </div>
          
        </footer>
        <VuePreloader background-color="#091a28" color="#ffffff" transition-type="fade-up" :loading-speed="25"
            :transition-speed="1400" @loading-is-over="loadingIsOver" @transition-is-over="transitionIsOver">
            <span>You are awesome animation goes here</span>
        </VuePreloader>
    </div>
</template>
<script setup>
import { VuePreloader } from 'vue-preloader';
import '../node_modules/vue-preloader/dist/style.css'
import { useRoute, useRouter } from 'vue-router';
import { async } from '@firebase/util';
const router = useRouter();

</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

html {
    height: 100%;

    body {
        height: 100%;
        background-position: center center;
        background-attachment: local;
        background-repeat: repeat;
    }
}


header {
    display: flex;
    justify-content: center;

    .logo {
        display: flex;
        justify-content: center;

        img {
            width: 355px;
            display: flex;
            justify-content: center;
        }
    }
}

.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
}



.con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
}



footer {
    display: flex;
    padding: 1%;
    flex-direction: column;
    font-size: 20px;
    color: #fff;
    height: 110px;
    flex: 0 0 auto;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
    margin-top: auto; // прижимаем футер к низу
    width: 100%; // или max-width, если футер должен быть определенной ширины
    // Стилизация футера
    gap: 20px;
}
</style>
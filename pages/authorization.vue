<template>
    <div class="wrapAutho">
        <textAutho></textAutho>
        <loginAutho @update:email="updateEmail"></loginAutho>
        <passwordAutho @update:password="updateAuthPassword"></passwordAutho>
        <nextAutho @click="userLogin"></nextAutho>
        <nuxt-link to="registration">Нет Аккаунта? Не проблема, зарегестрируйтесь!</nuxt-link>
    </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';
import textAutho from '~/components/authorizationStuff/textAutho.vue';
import passwordAutho from '~/components/authorizationStuff/passwordAutho.vue';
import loginAutho from '~/components/authorizationStuff/loginAutho.vue';
import nextAutho from '~/components/authorizationStuff/nextAutho.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { async } from '@firebase/util';

export default defineComponent({
    setup() {
        // Вместо деструктуризации $router используйте контекст напрямую для получения маршрутизатора
        const nuxtApp = useNuxtApp();
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/profile');
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // ...
            } else {
                router.push('/authorization');
                // User is signed out
                // ...
            }
        });
        const router = useRouter()
        const state = reactive({
            userAuthData: {
                email: '',
                password: '',
            },
            message: ''
        });

        const v$ = useVuelidate({
            userAuthData: {
                email: { required, email },
                password: { required }
            }
        }, state);

        function updateEmail(email) {
            state.userAuthData.email = email;
        }

        function updateAuthPassword(password) {
            state.userAuthData.password = password;
        }

        async function userLogin() {
            v$.value.$touch();
            if (!v$.value.$invalid) {
                const auth = getAuth()
                signInWithEmailAndPassword(
                    auth, state.userAuthData.email,
                    state.userAuthData.password)
                    .then(async (userCredential) => {
                        // Осуществляем редирект через nuxtApp.router, а не $router
                        router.push('/profile');
                    })
                    .catch((error) => {
                        state.message = "Ошибка авторизации: " + error.message;
                        console.error("авторизация:", error);
                    })

            } else {
                state.message = "Please correct the errors before submitting.";
            }
        }

        return {
            state,
            v$,
            updateEmail,
            updateAuthPassword,
            userLogin
        };
    },

    components: {
        textAutho,
        passwordAutho,
        loginAutho,
        nextAutho
    }
});
</script>

<style lang="scss">
.wrapAutho {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}
</style>
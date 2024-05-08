<template>
    <div class="wrapReg">
        <name @update:name="updateName"></name>
        <login @update:login="updateLogin"></login>
        <password @update:password="updatePassword"></password>
        <avatarka @update:avatar="updateAvatar"></avatarka>
        <next></next>
        <button @click="addUser">Добавить пользователя</button>
    </div>
</template>
<script>
import name from '~/components/registrationStuff/name.vue';
import login from '~/components/registrationStuff/login.vue';
import password from '~/components/registrationStuff/password.vue';
import avatarka from '~/components/registrationStuff/avatarka.vue';
import next from '~/components/registrationStuff/next.vue';



// Add a document to a collection
import { defineComponent, ref, reactive } from 'vue';
import { addDoc, collection,setDoc,doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default defineComponent({
    setup() {
        const { $firestore } = useNuxtApp();
        const db = ref($firestore);
        const state = reactive({
            userData: {
                name: '',
                login: '',
                password: '',
                avatarkaUrl: '',
            },
            avatarFile: null,
            message: '' // Для хранения сообщений об ошибках
        });
        const v$ = useVuelidate(
            {
                userData: {
                    name: { required },
                    login: { required, email },
                    password: { required },
                },
            },
            state
        );

        // Методы теперь определяются как функции
        function updateName(name) {
            state.userData.name = name;
        }

        function updateLogin(login) {
            state.userData.login = login;
        }

        function updatePassword(password) {
            state.userData.password = password;
        }

        function updateAvatar(file) {
            state.avatarFile = file;
        }

        async function addUser() {
            v$.value.$touch();
            if (!v$.value.$invalid) {
                const auth = getAuth()
                createUserWithEmailAndPassword(auth, state.userData.login, state.userData.password)
                    .then(async (userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        const storage = getStorage();
                        const avatarRef = storageRef(storage, 'avatars/' + state.avatarFile.name);
                        const snapshot = await uploadBytes(avatarRef, state.avatarFile);
                        const avatarUrl = await getDownloadURL(snapshot.ref);
                        state.userData.avatarkaUrl = avatarUrl;

                        const docRef = await setDoc(doc(db.value, 'users',user.uid), state.userData);
                        state.avatarFile = null;
                        // ...
                        // Очистка состояния
                        state.avatarFile = null;
                        state.userData = {
                            name: '',
                            email: '',
                            password: '',
                            avatarkaUrl: '',
                        };

                        console.log('Registered User with avatar:', user.uid);
                    })

                    .catch((error) => {
                        state.message = "Ошибка при добавлении пользователя: " + error.message;
                        console.error("Error adding document:", error);
                    })
            } else {
                alert('Некоторые поля заполнены некорректно. Пожалуйста, проверьте ввод и повторите попытку.');
            }
        }

        // Возвращаем все переменные и функции, чтобы они были доступны в шаблоне
        return {
            db,
            state,
            v$,
            updateName,
            updateLogin,
            updatePassword,
            updateAvatar,
            addUser
        };
    },
    components: {
        name,
        login,
        password,
        avatarka,
        next
    },

});
</script>
<style lang="scss">
.wrapReg {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>
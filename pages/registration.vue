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
import { addDoc, collection } from 'firebase/firestore';
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
                    login: { required },
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
                try {
                    const storage = getStorage();
                    const avatarRef = storageRef(storage, 'avatars/' + state.avatarFile.name);
                    const snapshot = await uploadBytes(avatarRef, state.avatarFile);
                    const avatarUrl = await getDownloadURL(snapshot.ref);
                    state.userData.avatarkaUrl = avatarUrl;

                    const docRef = await addDoc(collection(db.value, 'users'), state.userData);
                    console.log('User added with ID:', docRef.id);
                    state.avatarFile = null;
                } catch (error) {
                    state.message = "Ошибка при добавлении пользователя: " + error.message;
                    console.error("Error adding document:", error);
                }
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
    methods: {
        updateName(name) {
            this.userData.name = name
        },
        updateLogin(login) {
            this.userData.login = login
        },
        updatePassword(password) {
            this.userData.password = password
        },
        updateAvatar(file) {
            this.avatarFile = file
        },
        async addUser() {
            try {
                const storage = getStorage();
                // Создайте ссылку на Firebase Storage
                const avatarRef = storageRef(storage, 'avatars/' + this.avatarFile.name);
                // Загрузите файл
                const snapshot = await uploadBytes(avatarRef, this.avatarFile);
                // Получите URL загруженного изображения
                const avatarUrl = await getDownloadURL(snapshot.ref);
                // Сохраните URL в userData
                this.userData.avatarUrl = avatarUrl;

                // Теперь сохраните остальные данные пользователя в Firestore
                const docRef = await addDoc(collection(this.db, 'users'), this.userData);
                console.log('User added with ID:', docRef.id);

                // Очистите поле выбора файла
                this.avatarFile = null;
            } catch (error) {
                this.message = "Ошибка при добавлении пользователя: " + error.message;
                console.error("Error adding document:", error);
                console.error("Error adding document and image:", error);
            }
        },
    }
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
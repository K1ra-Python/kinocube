<template>
    <div class="wrapReg">
        <name></name>
        <login></login>
        <password></password>
        <avatarka></avatarka>
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

import { addDoc, collection } from 'firebase/firestore';

export default defineComponent({
    data() {
        return {
            message: "",
        };
    },
    setup() {
        const { $firestore } = useNuxtApp();
        const db = ref($firestore);

        return {
            db,
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
        async addUser() {
            try {
                const docRef = await addDoc(collection(this.db, 'users'), {
                    name: 'John Doe',
                    login: 'login',
                    password: 'pass',
                    // Другие поля, если они нужны
                });
                console.log('User added with ID:', docRef.id);
            } catch (error) {
                this.message = "Ошибка при добавлении пользователя: " + error.message;
                console.error("Error adding document:", error);
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
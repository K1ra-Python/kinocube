<template>
    <div class="wrapIndex">
        <textIndex></textIndex>
        <signUp @click="routerSignUp">
        </signUp>
        <signIn @click="routerSignIn">
        </signIn>
    </div>
</template>
<script setup>
import textIndex from '~/components/indexStuff/textIndex.vue';

import signUp from '~/components/indexStuff/signUp.vue';
import signIn from '~/components/indexStuff/signIn.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const routerSignUp = async () => {
    router.push('registration')
}
const routerSignIn = async () => {
    router.push('authorization')
}
</script>
<style lang="scss">
.wrapIndex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}
</style>
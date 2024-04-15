<template>
    <div class="wrapIndex">
        <textIndex></textIndex>
        <signGoogle></signGoogle>
        <signUp></signUp>
        <signIn></signIn>
    </div>
</template>
<script>
import textIndex from '~/components/buttons/textIndex.vue';
import signGoogle from '~/components/buttons/signGoogle.vue';
import signUp from '~/components/buttons/signUp.vue';
import signIn from '~/components/buttons/signIn.vue';
export default {
    components: {
        textIndex,
        signGoogle,
        signUp,
        signIn,
    }
}
</script>
<style lang="scss">
.wrapIndex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}
</style>
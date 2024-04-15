<template>
    <div class="wrapIndex">
        <textIndex></textIndex>
        <signGoogle></signGoogle>
        <signUp></signUp>
        <signIn></signIn>
    </div>
</template>
<script>
import textIndex from '~/components/indexStuff/textIndex.vue';
import signGoogle from '~/components/indexStuff/signGoogle.vue';
import signUp from '~/components/indexStuff/signUp.vue';
import signIn from '~/components/indexStuff/signIn.vue';
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
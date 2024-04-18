<template>
    <div class="wrapAutho">
        <textAutho></textAutho>
        <loginAutho></loginAutho>
        <passwordAutho></passwordAutho>
        <next></next>
    </div>
</template>
<script>
import textAutho from '~/components/authorizationStuff/textAutho.vue';
import passwordAutho from '~/components/authorizationStuff/passwordAutho.vue';
import loginAutho from '~/components/authorizationStuff/loginAutho.vue';
import next from '~/components/registrationStuff/next.vue';
export default {
    components: {
        loginAutho,
        passwordAutho,
        next,
        textAutho
    }
}
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
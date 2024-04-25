<template>
    <div class="wrapNoUser">
        <textNoUser></textNoUser>
        <createProfile></createProfile>
    </div>
</template>
<script>
import createProfile from '~/components/noUserStuff/createProfile.vue';
import textNoUser from '~/components/noUserStuff/textNoUser.vue';
export default {
    components: {
        createProfile,
        textNoUser
    }
}
</script>
<style lang="scss">
.wrapNoUser {
    padding-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}
</style>
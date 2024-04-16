<template>
    <div class="wrapReg">
        <name></name>
        <login></login>
        <password></password>
        <avatarka></avatarka>
        <next></next>
    </div>
</template>
<script>
import name from '~/components/registrationStuff/name.vue';
import login from '~/components/registrationStuff/login.vue';
import password from '~/components/registrationStuff/password.vue';
import avatarka from '~/components/registrationStuff/avatarka.vue';
import next from '~/components/registrationStuff/next.vue';

export default {
    components: {
        name,
        login,
        password,
        avatarka,
        next
    }
}
</script>
<style lang="scss">
.wrapReg{
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>
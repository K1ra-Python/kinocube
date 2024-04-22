<template>
    <div>
        <input class="my-button" name="name" type="password" placeholder="Ваш пароль" v-model="passwordAuthto"
            @input="updatePassword" />
    </div>
</template>

<script>
export default {
    data() {
        return{
            passwordAuthto: ''
        }
    },
    methods: {
        updateAuthPass(){
            this.$emit('update:password' ,this.passwordAuthto)
        }
    },
}
</script>
<style lang="scss">
@import '~/assets/css/main.scss';

.my-button {
    @include button-style;
}
</style>
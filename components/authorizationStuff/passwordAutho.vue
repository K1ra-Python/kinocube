<template>
    <div>
        <input class="my-button" name="name" type="password" placeholder="Ваш пароль" v-model="passwordAuthto"
            @input="updateAuthPassword" />
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
        updateAuthPassword(){
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
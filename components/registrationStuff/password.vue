<template>
    <div>
        <input class="my-button" name="name" type="password" placeholder="Ваш пароль" v-model="userPassword" @input="updatePassword" />
        <label for="name">Всегда делайте найдёжный пароль</label>
    </div>
</template>

<script>
export default{
    data(){
        return{
            userPassword: ''
        }
    },
    methods:{
        updatePassword(){
            this.$emit('update:password',this.userPassword)
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/css/main.scss';

.my-button {
    @include button-style;
}
</style>
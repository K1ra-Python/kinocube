<template>
    <div>
        <input class="my-button" name="name" type="text" placeholder="Ваше имя или никнейм" v-model="userName" @input="updateName" />
        <label for="name">Пишите что хотите</label>
    </div>
</template>

<script>
export default{
    data(){
        return{
            userName: ''
        }
    },
    methods:{
        updateName(){
            this.$emit('update:name', this.userName)
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
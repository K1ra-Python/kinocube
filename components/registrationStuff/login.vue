<template>
    <div>
        <input class="my-button" name="email" type="email" placeholder="Ваше дело дать вашу почту" v-model="userLogin" @input="updateLogin"/>
        <label for="email">Ваша почта</label>
    </div>
</template>

<script>
export default{
    data(){
        return{
            userLogin:''
        }
    },
    methods:{
        updateLogin(){
            this.$emit('update:login',this.userLogin)
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/css/main.scss';

.my-button {
    @include button-style;

}

label {
    padding-left: 5%;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
}
</style>
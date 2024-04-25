<template>
    <div>
        <input class="my-button" name="name" type="email" placeholder="Ваш email" v-model="userEmail"
            @input="updateEmail" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            userEmail: ''
        }

    },methods: {
        updateEmail() {
            this.$emit('update:email', this.userEmail)
        }
    },
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
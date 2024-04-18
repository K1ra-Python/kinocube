<template>
    <div>
        <input class="my-button" name="name" type="text" placeholder="Ваш логин" />
    </div>
</template>
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
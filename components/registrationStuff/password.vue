<template>
    <div>
        <input class="my-button" name="name" type="text" placeholder="Ваш пароль" />
        <label for="name">Всегда делайте найдёжный пароль</label>
    </div>
</template>
<style lang="scss">
@import '~/assets/css/main.scss';

.my-button {
    @include button-style;
}
</style>
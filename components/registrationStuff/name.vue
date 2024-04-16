<template>
    <div>
        <input class="my-button" name="name" type="text" placeholder="Ваше имя или никнейм" />
        <label for="name">Пишите что хотите</label>
    </div>
</template>
<style lang="scss">
@import '~/assets/css/main.scss';

.my-button {
    @include button-style;
}
</style>
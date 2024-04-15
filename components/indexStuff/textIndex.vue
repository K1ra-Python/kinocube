<template>
    <div class="text">
        <span>
            У меня нет политики конфидециальности и прочего, это моё первое самостоятельное приложение. Пользуйтесь смело!
        </span>
        <div class="heart">
            <img src="~/assets/heart.svg">
        </div>
    </div>
</template>
<style lang="scss">
.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1%;
    margin-top: 5%;
    gap: 20px;
    span {
        width: 500px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: #fff;
    }
}
</style>
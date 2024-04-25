<template>
    <div class="text">
        <span>
            Не нашёл вас в базе данных. Видимо аккаунта нет, так давайте создадим его!
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
    gap: 40px;
    span {
        width: 400px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: #fff;
    }
}
</style>
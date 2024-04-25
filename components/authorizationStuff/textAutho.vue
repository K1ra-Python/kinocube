<template>
    <div class="textA">
        <span>
            Добро пожаловать обранто!
        </span>
        <div class="heart">
            <img src="~/assets/heart.svg">
        </div>
    </div>
</template>
<style lang="scss">
.textA {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1%;
    margin-top: 20%;
    gap: 20px;

    span {

        font-family: var(--font-family);
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        color: #fff;
    }
}
</style>
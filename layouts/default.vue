<template>
    <div class="wrap">

        <header>
            <div class="logo">
                <img src="~/assets/logo.svg">
            </div>
        </header>
        <div class="con">
            <slot></slot>
        </div>
        <footer>
            AAAAAAAAAAAA
        </footer>

    </div>
</template>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

body,
height {
    height: 100%;
    background-position: center center;
    background-attachment: local;
    background-repeat: repeat;

}

header {
    display: flex;
    justify-content: center;

    .logo {
        display: flex;
        justify-content: center;

        img {
            width: 355px;
            display: flex;
            justify-content: center;
        }
    }
}

.wrap {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    flex: 1;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
}

.glassFrame {
    // Максимальная ширина всего содержимого, если нужно


}

.con {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

footer {
    flex: 0 0 auto;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
    margin-top: auto; // прижимаем футер к низу
    width: 100%; // или max-width, если футер должен быть определенной ширины
    // Стилизация футера
}
</style>
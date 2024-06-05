<template>
    <div class="wrap">
        <div class="glassFrame">
            <header>
                <div class="logo">
                    <img src="~/assets/logo.svg">
                </div>
            </header>
            <div class="cen">
                <slot></slot>
            </div>

        </div>
    </div>
</template>
<style lang="scss">
header {
    display: flex;
    justify-content: center;

    .logo {
        display: flex;
        justify-content: center;
        img{
            width: 355px;
            display: flex;
            justify-content: center;
        }
    }
}

.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
}

.glassFrame {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 40px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);

}
.cen{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
<template>
    <div class="wrap">
        <div class="glassFrame">
            <header>
                <div class="logo">
                    <img src="~/assets/logo.svg">
                </div>
            </header>
        <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
header{
    display: flex;
    justify-content: center;
}
.wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
}
.glassFrame {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 40px;
    width: 836px;
    height: 800px;
    backdrop-filter: blur(7px);
    background: rgba(0, 0, 0, 0.1);
}
</style>
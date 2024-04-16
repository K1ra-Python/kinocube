<template>
    <div class="wrapLabel">
        <label for="file-upload" class="custom-file-upload">
            Загрузить Аватарку
        </label>
    </div>
    <input id="file-upload" type="file" />
</template>
<style lang="scss">
input[type="file"] {
    display: none;
}

.wrapLabel {
display:flex;
justify-content:center;
margin-top: 10%;
    label {
        border: 3px solid #fff;
        border-radius: 50px;
        padding-left: 0%;
        width: 300px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 10px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
    }
}
</style>
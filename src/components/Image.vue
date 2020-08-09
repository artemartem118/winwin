<template>
    <div class="image-container">
        <img class="image-container__item" :src="imgDB" alt="фото">
    </div>
</template>

<script>
export default {
    name: 'Image',
    props: {
        imgDB: String
    }
}
</script>

<style lang="scss" scoped>
.image-container {
    height: 100%;
    width: 100%;

    &__item {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}
</style>

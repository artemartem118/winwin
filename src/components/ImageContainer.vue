<template>
    <div class="image-container">
        <img class="image-container__item" :src="imageUrl" alt="фото">
    </div>
</template>

<script>
export default {
    name: 'ImageContainer',
    props: {
        imageUrl: String
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

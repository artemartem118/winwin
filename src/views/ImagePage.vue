<template>
    <div class="image-container">
        <div class="image-container__item">
            <div class="image">
                <img class="image__img" :src="imageUrl" alt="фото">
            </div>
        </div>

        <div class="image-container__menu button-container">
            <Button class="button-container__item" name_button="Редактировать"/>
            <Button class="button-container__item" name_button="Удалить"/>
            <Button class="button-container__item" name_button="Скачать"/>
            <Button class="button-container__item" name_button="Назад"/>
        </div>
        <Preloader v-if="isFetching"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/common/Button'
import Preloader from '@/components/common/Preloader'

export default {
    name: 'ImagePage',
    components: { Preloader, Button },
    props: {
        imageUrl: String
    },
    data() {
        return {
            imageUrl: null,
            isFetching: false,
            imageId: null
        }
    },
    computed: {
        ...mapGetters([ 'getImages' ])
    },
    mounted() {
        const img = this.getImages.find(img => img.imageId === this.$route.params.id)
        console.log(img)
        this.imageUrl = img.imageUrl
        this.imageId = img.imageId
    }
}
</script>

<style lang="scss">
@import "../styles/variables";

.image-container {
    display: flex;
    height: $base * 600;

    &__item {
        flex-basis: $base * 700;
    }

    &__menu {
        flex-grow: 1;
    }
}

.button-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__item {
        padding-top: $base * 30;
    }
}

.image {
    height: 100%;
    width: 100%;

    &__img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}
</style>

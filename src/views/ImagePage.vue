<template>
    <div class="image-container">
        <div class="image-container__item">
            <div class="image">
                <img class="image__img" :src="imageUrl" alt="фото">
            </div>
        </div>

        <div class="image-container__menu button-container">
            <Button @up="onEditImage" class="button-container__item" name_button="Редактировать"/>
            <Button @up="onDeleteImage" class="button-container__item" name_button="Удалить"/>
            <Button @up="onDownloadImage" class="button-container__item" name_button="Скачать"/>
            <Button @up="getBack" class="button-container__item" name_button="Назад"/>
        </div>
        <Preloader v-if="isFetching"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Button from '@/components/common/Button'
import Preloader from '@/components/common/Preloader'

export default {
    name: 'ImagePage',
    components: { Preloader, Button },
    data() {
        return {
            imageUrl: null,
            isFetching: false,
            imageId: null
        }
    },
    methods: {
        ...mapActions([ 'deleteImageFromDB', 'downloadImage' ]),
        async onDeleteImage() {
            this.isFetching = true
            await this.deleteImageFromDB(this.imageId)
            this.isFetching = false
            this.getBack()
        },
        getBack() {
            this.$router.replace({ name: 'ImagesPage' })
        },
        onEditImage() {
            this.$router.replace({ name: 'EditImagePage', params: { id: this.imageId } })
        },
        async onDownloadImage() {
            this.isFetching = true
            await this.downloadImage(this.imageUrl)
            this.isFetching = false
        }
    },
    computed: {
        ...mapGetters([ 'getImages' ])
    },
    mounted() {
        const img = this.getImages.find(img => img.imageId === this.$route.params.id)
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

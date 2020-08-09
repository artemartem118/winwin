<template>
    <div class="image-container">
        <div class="image-container__cropper">
            <vue-cropper
                ref="cropper"
                :containerStyle="{ width: '100%', height: '100%' }"
            />
        </div>
        <div class="image-container__menu button-container">
            <Button class="button-container__item" name_button="Сохранить"/>
            <Button class="button-container__item" name_button="Сброс"/>
            <Button class="button-container__item" name_button="Назад"/>
        </div>
        <Preloader v-if="isFetching"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueCropper from 'vue-cropperjs'
import Button from '@/components/common/Button'
import Preloader from '@/components/common/Preloader'

import 'cropperjs/dist/cropper.css'

export default {
    name: 'EditImagePage',
    components: { Button, Preloader, VueCropper },
    data() {
        return {
            imageUrl: null,
            imageId: null,
            cropImg: null,
            isFetching: false
        }
    },
    computed: {
        ...mapGetters([ 'getImages' ])
    },
    mounted() {
        const img = this.getImages.find(img => img.imageId === this.$route.params.id)
        this.imageUrl = img.imageUrl
        this.imageId = img.imageId
        this.$refs.cropper.replace(this.imageUrl)
    }

}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.image-container__cropper {
    flex-basis: $base * 700;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

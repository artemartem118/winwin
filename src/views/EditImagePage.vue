<template>
    <div class="image-container">
        <div class="image-container__cropper">
            <vue-cropper
                ref="cropper"
                :containerStyle="{ width: '100%', height: '100%' }"
            />
        </div>
        <div class="image-container__menu button-container">
            <Button @up="onSaveImage" class="button-container__item" name_button="Сохранить"/>
            <Button @up="onResetImage" class="button-container__item" name_button="Сброс"/>
            <Button @up="getBack" class="button-container__item" name_button="Назад"/>
        </div>
        <Preloader v-if="isFetching"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    methods: {
        ...mapActions([ 'updateImageAfterEdit' ]),

        onSaveImage() {
            this.$refs.cropper.getCroppedCanvas().toBlob(async ( blob ) => {
                this.isFetching = true
                await this.updateImageAfterEdit({ file: blob, imageUrl: this.imageUrl, imageId: this.imageId })
                this.isFetching = false
                this.getBack()
            })
        },
        onResetImage() {
            this.$refs.cropper.reset()
        },
        getBack() {
            this.$router.replace({ name: 'ImagePage', params: { id: this.imageId } })
        },
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

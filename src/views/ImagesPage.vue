<template>
    <div class="images-pages">
        <div v-if="isClickOnInputFile" class="images-pages__menu menu-actions">
            <Button @up="chooseImage" name_button="Загрузить"/>
            <div class="input-file">
                <input ref="inputFile" type="file">
            </div>
        </div>
        <div v-else class="images-pages__menu menu-actions">
            <Button @up="setImage" name_button="Добавить"/>
            <Button @up="getBack" name_button="Не добавлять"/>
        </div>
        <draggable v-if="getImages.length" v-model="newSequenceImg" class="images-pages__items images-container">
            <div class="images-container__item" v-for="item in getImages" :key="item.imageId">
                <router-link :to="{name: 'ImagePage', params:{ id: item.imageId }}">
                    <ImageContainer :imageUrl="item.imageUrl"/>
                </router-link>
            </div>
        </draggable>
        <div v-else class="images-pages__info">
            Фотографий нет
        </div>
        <Preloader v-if="isFetching"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'

import ImageContainer from '@/components/ImageContainer'
import Button from '@/components/common/Button'
import Preloader from '@/components/common/Preloader'

export default {
    name: 'ImagesPage',
    components: { ImageContainer, Button, Preloader, draggable },
    data() {
        return {
            isClickOnInputFile: true,
            isFetching: false
        }
    },
    methods: {
        ...mapActions([ 'getImagesFromDB', 'setImageIntoDB', 'updateOrderImagesDB' ]),
        chooseImage() {
            this.inputFileData.click()
            this.isClickOnInputFile = false
        },
        async setImage() {
            this.isFetching = true

            const file = this.inputFileData.files[0]
            await this.setImageIntoDB(file)

            this.isFetching = false
            this.isClickOnInputFile = true
        },
        getBack() {
            this.isClickOnInputFile = true
        }
    },
    computed: {
        ...mapGetters([ 'getImages' ]),
        newSequenceImg: {
            get() {
                return this.getImages
            },
            async set( value ) {
                this.isFetching = true
                await this.updateOrderImagesDB(value)
                console.log(value)
                this.isFetching = false
            }
        }
    },
    async mounted() {
        this.inputFileData = this.$refs.inputFile
        this.isFetching = true
        await this.getImagesFromDB()
        this.isFetching = false
    }
}
</script>
<style lang="scss" scoped>
@import "../styles/variables";

.images-pages {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__menu {
        width: 1000px;
    }

    &__items {
        width: $base * 1000;
        margin-top: $base * 20;
    }

    &__info {
        font-size: $base * 20;
        margin-top: $base * 200;
    }
}

.menu-actions {
    display: flex;
    justify-content: space-around;
}

.images-container {
    display: flex;
    flex-wrap: wrap;

    &__item {
        flex-basis: 33%;
        height: $base * 330;
        padding-right: $base * 15;
        padding-left: $base * 15;
    }

    &__item:not(:nth-child(-n+3)) {
        padding-top: $base * 30;
    }
}

.input-file {
    display: none;
}
</style>

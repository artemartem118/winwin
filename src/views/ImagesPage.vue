<template>
    <div class="photos-pages">
        <div v-if="isInputFile" class="photos-pages__menu menu-actions">
            <Button name_button="Загрузить"/>
            <div class="input-file">
                <input ref="inputFile" type="file">
            </div>
        </div>
        <div v-else class="photos-pages__menu menu-actions">
            <Button name_button="Добавить"/>
            <Button name_button="Не добавлять"/>
        </div>
        <div class="photos-pages__items photos-container"></div>
        <div class="photos-container__item" v-for="item in getImages" :key="item.id">
                <Photo :imgDB="item.imgDB"/>
        </div>
        <div class="photos-pages__info">
            Фотографий нет
        </div>
        <Preloader v-if="isFetching"/>
    </div>
</template>

<script>
import Image from '@/components/Image'
import Button from '@/components/common/Button'
import Preloader from '@/components/common/Preloader'

export default {
    name: 'ImagesPage',
    components: { Image, Button, Preloader },
    data() {
        return {
            isInputFile: true,
            isFetching: false
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../styles/variables";

.photos-pages {
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

.photos-container {
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

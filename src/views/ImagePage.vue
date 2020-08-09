<template>
    <div class="photo-container">
        <div class="photo-container__item">
            <div class="photo">
                <img class="photo__img" alt="фото">
            </div>
        </div>

        <div class="photo-container__menu button-container">
            <Button class="button-container__item" name_button="Редактировать"/>
            <Button class="button-container__item" name_button="Удалить"/>
            <Button class="button-container__item" name_button="Скачать"/>
            <Button class="button-container__item" name_button="Назад"/>
        </div>
        <Preloader v-if="isFetching"/>
    </div>
</template>

<script>
import Button from '@/components/common/Button'
import Preloader from '@/components/common/Preloader'

export default {
    name: 'ImagePage',
    data() {
        return {
            isFetching: false
        }
    },
    components: { Preloader, Button }
}
</script>

<style lang="scss">
@import "../styles/variables";

.photo-container {
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

.photo {
    height: 100%;
    width: 100%;

    &__img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}
</style>

<template>
    <div class="image-container">
        <div class="image-container__cropper">

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
import Button from '@/components/common/Button'
import Preloader from '@/components/common/Preloader'

export default {
    name: 'EditImagePage',
    components: { Button, Preloader },
    data() {
        return {
            isFetching: false
        }
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

<template>
    <div class="button-container">
        <button @click="handler" class="button-container__btn">{{ name_button }}</button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        name_button: String
    },
    methods: {
        handler() {
            this.$emit('up')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.button-container {
    &__btn {
        font-size: 15px;
        color: $color-font;
        background-color: $color-main;
        border: none;
        width: $base * 200;
        padding: $base * 10 $base * 20 $base * 10 $base * 20;
        transition: $transition-delay;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }
}
</style>

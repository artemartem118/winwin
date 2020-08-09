<template>
    <div class="header">
        <div class="header-logo">
            <router-link class="header-logo__link" :to="{name: 'ImagesPage'}">
                Wi<span class="header-logo_size">n</span>Wi<span class="header-logo_size">n</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.header {
    height: $base * 100;
    background-color: $color-main;
    display: flex;
    align-items: center;
}

.header-logo {
    height: 60px;
    color: $color-font;
    font-size: $base * 30;

    &__link {
        text-decoration: none;
        padding-left: $base * 20;
        color: $color-font
    }

    &_size {
        font-size: $base * 45;
    }
}
</style>

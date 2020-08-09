<template>
    <div class="main">
        <div class="main__header">
            <Header/>
        </div>
        <div class="main__content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'MainLayout',
    components: { Header }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.main {
    min-height: 100vh;
    background-color: $color-background;

    &__content {
        max-width: $base * 1170;
        margin: 0 auto;
        padding-top: $base * 20;
        padding-bottom: $base * 20;
    }
}
</style>

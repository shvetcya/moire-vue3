<template>
    <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'Home' }">
                Каталог
            </router-link>
        </li>
        <li class="breadcrumbs__item">
            <span class="breadcrumbs__link">
                {{ props.title }}
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["title"],

    setup(props) {
        return { props };
    },
};
</script>

<style lang="scss" scoped>
</style>
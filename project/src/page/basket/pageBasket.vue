<template>
    <Header />
    <Main :basket="basket" />
    <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Main from "@/page/basket/components/Main";
import Footer from "@/components/Footer.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    components: {
        Header,
        Main,
        Footer,
    },

    setup() {
        const store = useStore();

        const basket = computed(() => store.state.basket.basket);

        return { basket };
    },
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss" scoped>
</style>
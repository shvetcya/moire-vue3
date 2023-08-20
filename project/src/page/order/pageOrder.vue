<template>
    <Header />
    <Main />
    <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Main from "@/page/order/components/Main";
import Footer from "@/components/Footer.vue";
export default {
    components: { Header, Main, Footer },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
</style>
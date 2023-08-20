<template>
    <Header />
    <Main />
    <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Main from "@/page/status/components/Main.vue";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        Header,
        Main,
        Footer,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
</style>
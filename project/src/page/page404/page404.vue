<template>
    <div class="page-container">
        <Header />
        <h1>ошибка 404</h1>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        Header,
        Footer,
    },

    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.page-container > h1 {
    text-align: center;
}
</style>
<template>
    <router-view></router-view>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        onBeforeMount(async () => {
            await store.dispatch("product/getProducts");
            await store.dispatch("basket/reloadBaskets");
        });
        return {};
    },
};
</script>

<style lang="scss">
.colors--black {
    background: rgb(237, 237, 237);
    border-radius: 15px;
    padding: 2px;
}
</style>

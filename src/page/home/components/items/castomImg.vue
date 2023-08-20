<template>
    <router-link
        class="catalog__pic"
        :to="{ name: 'item', params: { id: item.id } }"
    >
        <img
            v-if="productColor[item.id].gallery"
            :src="productColor[item.id].gallery[0].file.url"
            :alt="item.title"
        />

        <p class="facing" v-else>
            На фото {{ item.title }},
            цвет - {{ productColor[item.id].color.title }}.
        </p>
    </router-link>
</template>

<script>
import { toRefs } from "vue";
export default {
    props: ["item", "productColor"],
    setup(props) {
        const { item } = toRefs(props);
        const { productColor } = toRefs(props);
        return { item, productColor };
    },
};
</script>

<style lang="scss" scoped>
</style>
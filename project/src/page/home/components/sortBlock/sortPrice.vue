<template>
    <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <price-input v-model:value="minPrice" :title="'От'" />
        <price-input v-model:value="maxPrice" :title="'До'" />
    </fieldset>
</template>

<script>
import priceInput from "@/page/home/components/sortBlock/priceInput";
import { computed } from "vue";
export default {
    components: { priceInput },
    props: ["minPrice", "maxPrice"],
    setup(props, { emit }) {
        const minPrice = computed({
            get: () => props.minPrice,
            set: (value) => {
                emit("update:minPrice", value);
            },
        });
        const maxPrice = computed({
            get: () => props.maxPrice,
            set: (value) => {
                emit("update:maxPrice", value);
            },
        });
        return { minPrice, maxPrice };
    },
};
</script>

<style lang="scss" scoped>
</style>
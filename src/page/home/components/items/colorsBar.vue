<template>
    <ul class="colors colors--black">
        <li v-for="color in item.colors" :key="color.id" class="colors__item">
            <label class="colors__label" :title="color.color.title">
                <input
                    class="colors__radio sr-only"
                    type="radio"
                    :value="color"
                    v-model.number="productColor[item.id]"
                />
                <span
                    class="colors__value"
                    :style="{ backgroundColor: color.color.code }"
                >
                </span>
            </label>
        </li>
    </ul>
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
<template>
    <label class="form__label form__label--price">
        <input class="form__input" type="number" v-model.number="value" />
        <span class="form__value">{{ title }}</span>
    </label>
</template>

<script>
import { toRefs, computed } from "vue";

export default {
    props: ["value", "title"],
    setup(props, { emit }) {
        const { title } = toRefs(props);
        const value = computed({
            get: () => props.value,
            set: (value) => {
                const val = value == "" ? 0 : value;
                emit("update:value", val);
            },
        });
        return { title, value };
    },
};
</script>

<style lang="scss" scoped>
</style>
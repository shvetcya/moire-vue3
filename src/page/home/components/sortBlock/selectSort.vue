<template>
    <fieldset class="form__block">
        <legend class="form__legend">{{ title }}</legend>
        <label class="form__label form__label--select">
            <select class="form__select" v-model.number="model">
                <option v-for="item in arr" :key="item.id" :value="item.id">
                    {{ item.title }}
                </option>
            </select>
        </label>
    </fieldset>
</template>

<script>
import { toRefs, computed } from "vue";
export default {
    props: ["title", "model", "arr"],
    setup(props, { emit }) {
        const { title } = toRefs(props);
        const { arr } = toRefs(props);
        const model = computed({
            get: () => props.model,
            set: (value) => {
                emit("update:model", value);
            },
        });
        return { title, model, arr };
    },
};
</script>

<style lang="scss" scoped>
</style>
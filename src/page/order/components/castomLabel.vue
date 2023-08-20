<template>
    <label class="form__label">
        <slot />
        <span class="form__value">{{ title }}</span>
        <span class="form__error" v-if="error && error[name]">{{
            error[name]
        }}</span>
    </label>
</template>

<script>
import { toRefs, ref } from "vue";
export default {
    props: ["title", "error", "name"],
    setup(props) {
        const { title } = toRefs(props);
        const { error } = toRefs(props);
        const { name } = toRefs(props);

        return { title, error, name };
    },
};
</script>

<style lang="scss" scoped>
</style>
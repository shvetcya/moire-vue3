<template>
    <fieldset class="form__block">
        <legend class="form__legend">{{ title }}</legend>
        <ul class="check-list">
            <li v-for="item in arr" :key="item.id" class="check-list__item">
                <label class="check-list__label">
                    <input
                        class="check-list__check sr-only"
                        type="checkbox"
                        v-model="model[item.id]"
                    />
                    <span class="check-list__desc">
                        {{ item.title }}
                        <span>({{ item?.productsCount }})</span>
                    </span>
                </label>
            </li>
        </ul>
    </fieldset>
</template>

<script>
import { toRefs, computed } from "vue";
export default {
    props: ["title", "arr", "value"],
    setup(props, { emit }) {
        const { title } = toRefs(props);
        const { arr } = toRefs(props);
        const model = computed({
            get: () => props.value,
            set: (value) => {
                emit("update:value", value);
            },
        });
                console.log(Object.keys(toRefs(props)))

                console.log(title, arr)

        return { title, arr, model };
    },
};
</script>

<style lang="scss" scoped>
</style>
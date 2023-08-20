<template>
    <li class="dictionary__item">
        <span class="dictionary__key"> {{ title }} </span>
        <span class="dictionary__value"> {{ data }} </span>
    </li>
</template>

<script>
import { toRefs, ref } from "vue";
export default {
    props: ["data", "title"],
    setup(props) {
        const { title } = toRefs(props);
        const data = ref(props.data);
        return { title, data };
    },
};
</script>

<style lang="scss" scoped>
</style>
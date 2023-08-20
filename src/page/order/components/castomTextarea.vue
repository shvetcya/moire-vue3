<template>
    <castom-label :title="title">
        <textarea
            class="form__input form__input--area"
            :placeholder="placeholder"
            v-model="content"
        ></textarea>
    </castom-label>
</template>

<script>
import { ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import castomLabel from "@/page/order/components/castomLabel";
export default {
    props: ["placeholder", "title"],
    components: { castomLabel },
    setup(props) {
        const store = useStore();
        const { placeholder } = toRefs(props);
        const { title } = toRefs(props);

        const content = ref("");

        watch(content, () => {
            const data = {
                type: "comments",
                data: content.value,
            };
            store.commit("order/setOrders", data);
        });

        return { placeholder, content, title };
    },
};
</script>

<style lang="scss" scoped>
</style>
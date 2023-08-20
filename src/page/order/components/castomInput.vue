<template>
    <castom-label :title="title" :error="error" :name="name">
        <input
            class="form__input"
            :type="type"
            :name="name"
            :placeholder="placeholder"
            v-model="content"
        />
    </castom-label>
</template>

<script>
import { ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import castomLabel from "@/page/order/components/castomLabel";
export default {
    props: ["name", "placeholder", "type", "title", "error"],
    components: { castomLabel },
    setup(props) {
        const store = useStore();
        const { name } = toRefs(props);
        const { placeholder } = toRefs(props);
        const { type } = toRefs(props);
        const { title } = toRefs(props);
        const { error } = toRefs(props);

        const content = ref("");

        watch(content, () => {
            const data = {
                type: name.value,
                data: content.value,
            };
            store.commit("order/setOrders", data);
        });

        return { name, placeholder, type, content, title, error };
    },
};
</script>

<style lang="scss" scoped>
</style>
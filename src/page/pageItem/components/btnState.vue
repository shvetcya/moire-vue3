<template>
    <div>
        <span>{{ message }}</span>
    </div>
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";

export default {
    props: ["stateSubmit"],

    setup(props) {
        const store = useStore();
        const resp = computed(() => store.state.basket.basketStatus);

        const message = ref("В корзину");

        watchEffect(() => {
            if (props.stateSubmit == "tr") {
                message.value = "В процессе";
            }
            if (props.stateSubmit === "fl") {
                if (resp.value == "") {
                    message.value = "Добавлено";

                    setTimeout(() => {
                        message.value = "В корзину";
                    }, 2000);
                } else {
                    message.value = "Ошибка";

                    setTimeout(() => {
                        message.value = "Попробовать снова";
                    }, 2000);
                }
            }
        });

        return { message };
    },
};
</script>

<style lang="scss" scoped>
</style>
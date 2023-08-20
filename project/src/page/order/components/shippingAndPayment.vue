<template>
    <div class="cart__options">
        <h3 class="cart__title">Доставка</h3>
        <ul class="cart__options options">
            <li class="options__item">
                <label class="options__label">
                    <input
                        class="options__radio sr-only"
                        type="radio"
                        :value="1"
                        v-model="sipping"
                    />
                    <span class="options__value">
                        Самовывоз <b>бесплатно</b>
                    </span>
                </label>
            </li>
            <li class="options__item">
                <label class="options__label">
                    <input
                        class="options__radio sr-only"
                        type="radio"
                        :value="2"
                        v-model="sipping"
                    />
                    <span class="options__value">
                        Курьером <b>1 200 ₽</b>
                    </span>
                </label>
            </li>
        </ul>

        <h3 class="cart__title">Оплата</h3>
        <ul class="cart__options options">
            <li class="options__item">
                <label class="options__label">
                    <input
                        class="options__radio sr-only"
                        type="radio"
                        :value="1"
                        v-model="payment"
                        :disabled="sipping == 2"
                    />
                    <span class="options__value"> Картой при получении </span>
                </label>
            </li>
            <li class="options__item">
                <label class="options__label">
                    <input
                        class="options__radio sr-only"
                        type="radio"
                        :value="2"
                        v-model="payment"
                    />
                    <span class="options__value">
                        Наличными при получении
                    </span>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, watchEffect, watch } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        const sipping = ref(2);
        const payment = ref(2);

        watchEffect(() => {
            const data = {
                type: "deliveryTypeId",
                data: sipping.value,
            };
            store.commit("order/setOrders", data);
        });
        watchEffect(() => {
            const data = {
                type: "paymentTypeId",
                data: payment.value,
            };
            store.commit("order/setOrders", data);
        });
        watch(sipping, () => {
            if (sipping.value == 2) {
                payment.value = 2;
            }
        });
        return { sipping, payment };
    },
};
</script>

<style lang="scss" scoped>
</style>
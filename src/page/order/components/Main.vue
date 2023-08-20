<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link
                        :to="{ name: 'Home' }"
                        class="breadcrumbs__link"
                    >
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link
                        :to="{ name: 'basket' }"
                        class="breadcrumbs__link"
                    >
                        Корзина
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link"> Оформление заказа </a>
                </li>
            </ul>

            <div class="content__row">
                <h1 class="content__title">Оформление заказа</h1>
            </div>
        </div>

        <section class="cart">
            <form class="cart__form form" @submit.prevent="submit">
                <div class="cart__field">
                    <div class="cart__data">
                        <castom-input
                            :placeholder="'Введите ваше имя'"
                            :type="'text'"
                            :name="'name'"
                            :title="'Фио'"
                            :error="errorOrder"
                        />
                        <castom-input
                            :placeholder="'Введите ваш адрес'"
                            :type="'text'"
                            :name="'address'"
                            :title="'Адрес доставки'"
                            :error="errorOrder"
                        />
                        <castom-input
                            :placeholder="'Введите ваш телефон'"
                            :type="'tel'"
                            :name="'phone'"
                            :title="'Телефон'"
                            :error="errorOrder"
                        />

                        <castom-input
                            :placeholder="'Введи ваш Email'"
                            :type="'email'"
                            :name="'email'"
                            :title="'Email'"
                            :error="errorOrder"
                        />

                        <castomTextarea
                            :placeholder="'Ваши пожелания'"
                            :title="'Комментарий к заказу'"
                        />
                    </div>

                    <shipping-and-payment />
                </div>

                <div class="cart__block">
                    <ul class="cart__orders">
                        <li
                            class="cart__order"
                            v-for="item in basket"
                            :key="item.id"
                        >
                            <div class="cart__order-container">
                                <h3 class="cart__order-title">
                                    {{ item.product.title }}
                                </h3>
                                <span class="cart__order-price"
                                    >{{
                                        $filters.numberFormat(
                                            item.price * item.quantity
                                        )
                                    }}
                                    ₽</span
                                >
                                <span class="cart__order-articul"
                                    >Артикул: {{ item.id }}</span
                                >
                                <span class="cart__order-quantity"
                                    >{{ item.quantity }}
                                    {{
                                        $filters.declOfNum(
                                            item.quantity,
                                            allDeclination2
                                        )
                                    }}</span
                                >
                            </div>
                        </li>
                        <li v-if="basket.length == 0">
                            <h3>В корзине нет товаров</h3>
                        </li>
                    </ul>

                    <div class="cart__total">
                        <p>
                            Доставка: <b>{{ delivery.title }}</b>
                        </p>
                        <p>
                            Итого: <b>{{ allGoods }}</b>
                            {{ $filters.declOfNum(allGoods, allDeclination) }}
                            на сумму
                            <b>{{ $filters.numberFormat(allPrice) }} ₽</b>
                        </p>
                    </div>

                    <button
                        class="cart__button button button--primery"
                        type="submit"
                    >
                        Оформить заказ
                    </button>
                </div>
                <div class="cart__error form__error-block" v-if="errorMessage">
                    <h4>Заявка не отправлена!</h4>
                    <p>
                        {{ errorMessage }}
                    </p>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import castomInput from "@/page/order/components/castomInput";
import castomTextarea from "@/page/order/components/castomTextarea";
import shippingAndPayment from "@/page/order/components/shippingAndPayment";
import { useStore } from "vuex";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { urlAPI } from "@/urlAPI.js";
export default {
    components: { castomInput, castomTextarea, shippingAndPayment },

    setup() {
        const store = useStore();
        const router = useRouter();
        const basket = computed(() => store.state.basket.basket);
        const allGoods = computed(() => store.state.basket.allGoodsBasket);
        const allDeclination = ["товар", "товара", "товаров"];
        const allDeclination2 = ["штука", "штуки", "штук"];
        const errorOrder = ref("");
        const errorMessage = ref("");
        const deliveryPrice = ref({
            1: {
                title: "бесплатно",
                price: 0,
            },
            2: {
                title: "1 200 ₽",
                price: 1200,
            },
        });
        const delivery = ref(deliveryPrice.value[1]);
        const data = computed(() => store.state.order.ordersData);

        const allPrice = computed(() => {
            if (data.value.deliveryTypeId == 2) {
                return store.state.basket.allPrice + delivery.value.price;
            } else {
                return store.state.basket.allPrice;
            }
        });

        watchEffect(() => {
            if (data.value.deliveryTypeId == 2) {
                delivery.value = deliveryPrice.value[2];
            }
            if (data.value.deliveryTypeId == 1) {
                delivery.value = deliveryPrice.value[1];
            }
        });

        async function submit() {
            const userAccessKey = computed(
                () => store.state.basket.userAccessKey
            );

            await axios({
                method: "POST",
                url: urlAPI + "orders",
                data: {
                    name: String(data.value.name),
                    address: String(data.value.address),
                    phone: String(data.value.phone),
                    email: String(data.value.email),
                    deliveryTypeId: Number(data.value.deliveryTypeId),
                    paymentTypeId: Number(data.value.paymentTypeId),
                    comment: String(data.value.comments),
                },
                params: {
                    userAccessKey: userAccessKey.value,
                },
            })
                .catch((err) => {
                    errorOrder.value = err.response.data.error.request || {};
                    errorMessage.value = err.response.data.error.message || "";
                })
                .then((resp) => {
                    if (resp) {
                        store.dispatch("basket/reloadBaskets");
                        store.commit("state/setState", resp.data);
                        router.push({
                            name: "status",
                            params: {
                                id: resp.data.id,
                            },
                        });
                    }
                });
        }
        return {
            basket,
            allDeclination,
            allDeclination2,
            allGoods,
            allPrice,
            submit,
            errorOrder,
            errorMessage,
            delivery,
        };
    },
};
</script>

<style lang="scss" scoped>
.cart {
    &__order {
        display: block;
    }
    &__order-container {
        display: grid;
        grid-template-columns: 70% 20%;
        justify-content: space-between;
    }
    &__order-price,
    &__order-quantity {
        text-align: center;
        display: grid;
        align-items: center;
        color: black;
        font-weight: 500;
    }
}
</style>
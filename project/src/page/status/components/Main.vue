<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link
                        class="breadcrumbs__link"
                        :to="{ name: 'Home' }"
                    >
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link
                        class="breadcrumbs__link"
                        :to="{ name: 'basket' }"
                    >
                        Корзина
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link"> Оформление заказа </a>
                </li>
            </ul>

            <h1 v-if="Object.keys(data).length > 0" class="content__title">
                Заказ оформлен <span>№ {{ data.id }}</span>
            </h1>
            <h1 v-else class="content__title">Загрузка ...</h1>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <p class="cart__message">
                        Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу
                        почту придет письмо с&nbsp;деталями заказа. Наши
                        менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
                        уточнения деталей доставки.
                    </p>

                    <ul class="dictionary">
                        <item-user :title="'Получатель'" :data="data.name" />
                        <item-user
                            :title="'Адрес доставки'"
                            :data="data.address"
                        />
                        <item-user :title="'Телефон'" :data="data.phone" />
                        <item-user :title="'Email'" :data="data.email" />
                        <item-user
                            :title="'Способ оплаты'"
                            :data="data.paymentType"
                        />
                    </ul>
                </div>

                <div class="cart__block">
                    <ul class="cart__orders">
                        <template v-if="Object.keys(data).length > 0">
                            <li
                                class="cart__order"
                                v-for="item in data.basket.items"
                                :key="item.id"
                            >
                                <h3>
                                    {{ item.product.title }}
                                </h3>
                                <b
                                    >{{
                                        $filters.numberFormat(
                                            item.product.price * item.quantity
                                        )
                                    }}
                                    ₽</b
                                >
                                <span>Артикул: {{ item.id }}</span>
                            </li>
                        </template>
                        <h3 v-else>Загрузка ...</h3>
                    </ul>

                    <div class="cart__total">
                        <p>Доставка: <b>бесплатно</b></p>
                        <p>
                            Итого: <b>{{ allGooods }}</b>
                            {{ $filters.declOfNum(allGooods, allDeclination) }}
                            на сумму
                            <b
                                >{{
                                    $filters.numberFormat(data.totalPrice)
                                }}
                                ₽</b
                            >
                        </p>
                    </div>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import itemUser from "@/page/status/components/itemUser";

export default {
    components: { itemUser },
    setup() {
        const route = useRoute();
        const store = useStore();
        const data = computed(() => store.state.state.state);
        const allGooods = computed(() => {
            return data.value.basket.items.reduce((prev, curr) => {
                return prev + curr.quantity;
            }, 0);
        });
        const allDeclination = ["товар", "товара", "товаров"];
        onMounted(() => {
            const stateData = computed(() => store.state.state.state);
            const routId = route.params.id;
            if (stateData.value.id != routId) {
                store.dispatch("state/getStateData", routId);
            }
        });

        return { data, allGooods, allDeclination };
    },
};
</script>

<style lang="scss" scoped>
</style>
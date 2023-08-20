<template>
    <header class="header container">
        <div class="header__wrapper">
            <router-link class="header__info" :to="{ name: 'Home' }"
                >Каталог</router-link
            >

            <router-link class="header__logo" :to="{ name: 'Home' }">
                <img
                    src="/img/svg/logo-moire.svg"
                    alt="Логотип интернет магазина Moire"
                    width="116"
                    height="34"
                />
            </router-link>

            <a class="header__tel" href="tel:8 800 600 90 09">
                8 800 600 90 09
            </a>

            <router-link
                :to="{ name: 'basket' }"
                class="header__cart"
                aria-label="Корзина с товарами"
            >
                <svg width="19" height="24">
                    <use xlink:href="#icon-cart"></use>
                </svg>
                <span class="header__count" aria-label="Количество товаров">{{
                    basketGoodsCount
                }}</span>
            </router-link>
        </div>
    </header>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    setup() {
        const store = useStore();
        const basket = computed(() => store.state.basket.basket);
        const basketGoodsCount = computed(
            () => store.state.basket.allGoodsBasket
        );

        return {
            basket,
            basketGoodsCount,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
<template>
    <main class="content container" v-if="basket">
        <div class="content__top">
            <bread-crumbs :title="'Корзина'" />

            <div class="content__row">
                <h1 class="content__title">Корзина</h1>
                <span class="content__info">
                    {{
                        basket.length +
                        " " +
                        $filters.declOfNum(basket.length, allDeclination)
                    }}
                </span>
            </div>
        </div>

        <section class="cart" v-if="basket.length > 0">
            <form class="cart__form form">
                <div class="cart__field">
                    <ul class="cart__list">
                        <cart-item
                            v-for="item in basket"
                            :key="item.id"
                            :item="item"
                        />
                    </ul>
                </div>

                <cart-block :allPrice="allPrice" />
            </form>
        </section>
    </main>
</template>

<script>
import breadCrumbs from "@/components/breadCrumbs";
import cartItem from "@/page/basket/components/cartItem";
import cartBlock from "@/page/basket/components/cartBlock";
import { toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
    props: ["basket"],
    components: { breadCrumbs, cartBlock, cartItem },

    setup(props) {
        const { basket } = toRefs(props);
        const store = useStore();
        const allDeclination = ["товар", "товара", "товаров"];
        const allPrice = computed(() => store.state.basket.allPrice);

        return {
            basket,
            allDeclination,
            allPrice,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
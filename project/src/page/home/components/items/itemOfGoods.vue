<template>
    <li v-for="item in product" :key="item.id" class="catalog__item">
        <castom-img :item="item" :productColor="productColor" />

        <h3 class="catalog__title">
            <router-link :to="{ name: 'item', params: { id: item.id } }">
                {{ item.title }}
            </router-link>
        </h3>

        <span class="catalog__price">
            {{ $filters.numberFormat(item.price) }} ₽
        </span>

        <div class="color-bar-container">
            <colors-bar v-model:productColor="productColor" :item="item" />

            <button class="btn-add-goods" @click.prevent="submit(item)">
                <btn-basket :item="item" :state="state" />
            </button>
        </div>
    </li>
</template>

<script>
import { ref } from "vue";
import { computed, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import btnBasket from "@/page/home/components/items/btnBasket";
import castomImg from "@/page/home/components/items/castomImg";
import colorsBar from "@/page/home/components/items/colorsBar";

export default {
    components: { btnBasket, castomImg, colorsBar },
    setup() {
        const store = useStore();
        const productColor = ref({});
        const state = ref({
            state: "no",
            id: 0,
        });
        const product = computed(() => {
            return store.state.product.products;
        });

        function productColorStart() {
            productColor.value = {};

            product.value.forEach((element) => {
                productColor.value[element.id] = element.colors[0];
            });
        }

        async function submit(item) {
            state.value.state = "process";
            state.value.id = item.id;

            const goodsArr = {};
            const data = {
                goodsArr: goodsArr,
            };

            await store.dispatch("basket/product", item.id).then((resp) => {
                const product = resp.data;

                data.product = product;
                goodsArr.id = product.id;
                goodsArr.sizeId = product.sizes[0].id;
                goodsArr.quantity = 1;
                goodsArr.colorId = productColor.value[item.id].color.id;
            });

            await store.dispatch("basket/submit", data).then(() => {
                state.value.state = "ok";
                setTimeout(() => {
                    state.value.state = "no";
                }, 1000);
            });
        }

        watch(product, productColorStart);
        onBeforeMount(productColorStart);

        return { product, productColor, submit, state };
    },
};
</script>

<style lang="scss" scoped>
.color-bar-container {
    display: grid;
    grid-template-columns: 70% 30%;
    justify-content: space-between;
}
.btn-add-goods {
    width: 30px;
    height: 30px;
    margin-left: auto;

    border: none;
    outline: none;
    background: transparent;

    cursor: pointer;
}
.facing {
    padding: 15px;
    text-align: center;
}
</style>
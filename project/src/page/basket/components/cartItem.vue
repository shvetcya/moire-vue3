<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img
                v-if="item.color.gallery"
                :src="item.color.gallery[0].file.url"
                width="120"
                height="120"
                :alt="item.product.title"
            />
            <p v-else class="facing">
                На фото {{ item.product.title }},
                цвет - {{ item.color.color.title }}.
            </p>
        </div>

        <h3 class="product__title">
            {{ item.product.title }}
        </h3>
        <p class="product__info product__info--color">
            Цвет:
            <span>
                <i
                    :style="{
                        backgroundColor: item.color.color.code,
                    }"
                ></i>
                {{ item.color.color.title }}
            </span>
        </p>
        <span class="product__code"> Артикул: {{ item.id }} </span>

        <div class="product__counter form__counter">
            <button
                type="button"
                aria-label="Убрать один товар"
                @click.prevent="decrement()"
                :class="{ disabled: item.quantity == 1 }"
            >
                <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                </svg>
            </button>

            <input class="input" type="text" v-model.number="item.quantity" />

            <button
                type="button"
                aria-label="Добавить один товар"
                @click.prevent="increment()"
            >
                <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                </svg>
            </button>
        </div>

        <b class="product__price">
            {{ $filters.numberFormat(item.price * item.quantity) }}
            ₽
        </b>

        <button
            class="product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="remove()"
        >
            <svg width="20" height="20" fill="currentColor">
                <use xlink:href="#icon-close"></use>
            </svg>
        </button>
    </li>
</template>

<script>
import axios from "axios";
import { toRefs, computed, watch } from "vue";
import { useStore } from "vuex";
import { urlAPI } from "@/urlAPI.js";

export default {
    props: ["item"],
    setup(props) {
        const store = useStore();
        const accessKey = computed(() => store.state.basket.userAccessKey);
        const count = computed(() => item.value.quantity);
        const { item } = toRefs(props);

        async function remove() {
            await axios({
                method: "DELETE",
                url: urlAPI + "baskets/products",
                data: {
                    basketItemId: String(item.value.id),
                },
                params: {
                    userAccessKey: accessKey.value,
                },
            }).then(async () => {
                await store.dispatch("basket/reloadBaskets");
            });
        }
        async function increment() {
            let count = {
                basketId: item.value.id,
                quantity: item.value.quantity + 1,
            };

            await store.dispatch("basket/changeGoods", count);
        }
        async function decrement() {
            if (item.value.quantity > 1) {
                let count = {
                    basketId: item.value.id,
                    quantity: item.value.quantity - 1,
                };

                await store.dispatch("basket/changeGoods", count);
            }
        }

        watch(count, async () => {
            let count = {
                basketId: item.value.id,
                quantity: item.value.quantity,
            };

            await store.dispatch("basket/changeGoods", count);
        });

        return { item, remove, increment, decrement };
    },
};
</script>

<style lang="scss" scoped>
.button-del {
    cursor: pointer;
}

.disabled {
    opacity: 0.6;
    cursor: default;
    &:hover,
    &:focus {
        background: transparent;
    }

    &:hover > svg,
    &:focus > svg {
        fill: black;
    }
}

.facing {
    margin: 0;
    text-align: center;
    padding: 5px 0;
}

.input {
    border: none;
    outline: none;
}
</style>
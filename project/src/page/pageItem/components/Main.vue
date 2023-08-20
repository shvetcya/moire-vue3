<template>
    <main class="content container" v-if="!loading">
        <div class="content__top">
            <bread-crumbs :title="product.title" />
        </div>

        <section class="item">
            <div class="item__pics pics">
                <div class="pics__wrapper">
                    <img
                        v-if="colors.gallery"
                        width="570"
                        height="570"
                        :src="colors.gallery[0].file.url"
                        :alt="product.title"
                    />
                    <p v-else class="facing">
                        На фото {{ product.title }},
                        цвет - {{ colors.color.title }}.
                    </p>
                </div>

                <ul class="pics__list">
                    <li
                        class="pics__item"
                        v-for="color in product.colors"
                        :key="color.id"
                    >
                        <a
                            class="pics__link"
                            :class="{
                                'pics__link--current': colors.id == color.id,
                            }"
                            @click.prevent="colorsUpdate(color)"
                        >
                            <img
                                v-if="color.gallery"
                                width="98"
                                height="98"
                                :src="color.gallery[0].file.url"
                                :alt="color.color.title"
                            />

                            <p v-else class="facing">
                                И здесь тоже он должен быть
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="item__info">
                <span class="item__code">Артикул: {{ product.id }}</span>
                <h2 class="item__title">{{ product.title }}</h2>
                <div class="item__form">
                    <form class="form" @submit.prevent="submit">
                        <div class="item__row item__row--center">
                            <div class="form__counter">
                                <button
                                    type="button"
                                    :class="{ disabled: countItem == 1 }"
                                    aria-label="Убрать один товар"
                                    @click.prevent="decrement"
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        fill="currentColor"
                                    >
                                        <use xlink:href="#icon-minus"></use>
                                    </svg>
                                </button>

                                <input
                                    class="input"
                                    type="text"
                                    v-model.number="countItem"
                                />

                                <button
                                    type="button"
                                    aria-label="Добавить один товар"
                                    @click.prevent="increment"
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        fill="currentColor"
                                    >
                                        <use xlink:href="#icon-plus"></use>
                                    </svg>
                                </button>
                            </div>

                            <b class="item__price">
                                {{
                                    $filters.numberFormat(
                                        product.price * countItem
                                    )
                                }}
                                ₽
                            </b>
                        </div>

                        <div class="item__row">
                            <fieldset class="form__block">
                                <legend class="form__legend">Цвет</legend>
                                <ul class="colors colors--black">
                                    <li
                                        class="colors__item"
                                        v-for="color in product.colors"
                                        :key="color.id"
                                    >
                                        <label class="colors__label">
                                            <input
                                                class="colors__radio sr-only"
                                                type="radio"
                                                :title="color.color.id"
                                                v-model="colors"
                                                :value="color"
                                            />
                                            <span
                                                class="colors__value"
                                                :style="{
                                                    backgroundColor:
                                                        color.color.code,
                                                }"
                                            >
                                            </span>
                                        </label>
                                    </li>
                                </ul>
                            </fieldset>

                            <fieldset class="form__block">
                                <legend class="form__legend">Размер</legend>
                                <label
                                    class="
                                        form__label
                                        form__label--small
                                        form__label--select
                                    "
                                >
                                    <select class="form__select" v-model="size">
                                        <option
                                            v-for="size in product.sizes"
                                            :key="size.id"
                                            :value="size.id"
                                        >
                                            {{ size.title }}
                                        </option>
                                    </select>
                                </label>
                            </fieldset>
                        </div>

                        <slot>
                            <button
                                class="item__button button button--primery"
                                type="submit"
                                id="item-page-btn-submit"
                            >
                                <btn-state :stateSubmit="stateSubmit" />
                            </button>
                        </slot>
                    </form>
                </div>
            </div>

            <div class="item__desc">
                <ul class="tabs">
                    <li class="tabs__item">
                        <a
                            class="tabs__link"
                            :class="{
                                'tabs__link--current': infoField == 'info',
                            }"
                            @click.prevent="infoFieldState('info')"
                        >
                            Информация о товаре
                        </a>
                    </li>
                    <li class="tabs__item">
                        <a
                            class="tabs__link"
                            :class="{
                                'tabs__link--current': infoField == 'return',
                            }"
                            @click.prevent="infoFieldState('return')"
                        >
                            Доставка и возврат
                        </a>
                    </li>
                </ul>

                <info-item :item="product" v-if="infoField == 'info'" />
                <delivery-and-return v-else-if="infoField == 'return'" />
            </div>
        </section>
    </main>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onBeforeMount, ref } from "vue";
import infoItem from "@/page/pageItem/components/infoItem";
import deliveryAndReturn from "@/page/pageItem/components/deliveryAndReturn";
import btnState from "@/page/pageItem/components/btnState";
import breadCrumbs from "@/components/breadCrumbs";

export default {
    components: { infoItem, deliveryAndReturn, btnState, breadCrumbs },
    setup() {
        const route = useRoute();
        const store = useStore();
        const loading = ref(true);

        const infoField = ref("info");

        const product = ref({});
        const colors = ref({});
        const size = ref();
        const countItem = ref(Number(1));

        const stateSubmit = ref("");

        async function submit() {
            stateSubmit.value = "tr";

            const goodsArr = {
                id: product.value.id,
                colorId: colors.value.color.id,
                sizeId: size.value,
                quantity: countItem.value,
            };

            const data = {
                goodsArr: goodsArr,
                product: product.value,
            };

            await store.dispatch("basket/submit", data);

            countItem.value = 1;
            stateSubmit.value = "fl";
        }
        function increment() {
            countItem.value += 1;
        }
        function decrement() {
            if (countItem.value > 1) {
                countItem.value -= 1;
            }
        }
        function colorsUpdate(color) {
            colors.value = color;
        }
        function infoFieldState(state) {
            infoField.value = state;
        }

        onBeforeMount(async () => {
            loading.value = true;
            const id = route.params.id;
            await store.dispatch("basket/product", id).then((resp) => {
                product.value = resp.data;
                colors.value = resp.data.colors[0];
                size.value = resp.data.sizes[0].id;
            });
            loading.value = false;
        });

        return {
            loading,
            product,
            colors,
            size,
            countItem,
            increment,
            decrement,
            colorsUpdate,
            infoField,
            infoFieldState,
            submit,
            stateSubmit,
        };
    },
};
</script>

<style lang="scss" scoped>
.disabled {
    cursor: default;
    opacity: 0.5;
}

.disabled:hover,
.disabled:focus {
    background: transparent;
}

.disabled:hover > svg,
.disabled:focus > svg {
    fill: black;
}

.tabs__link {
    cursor: pointer;
}

.pics__link {
    cursor: pointer;
    display: block;
}
.facing {
    padding: 5px;
    text-align: center;
}
.colors {
    display: flex;
    justify-content: center;
}
.input {
    outline: none;
    border: none;
}
</style>
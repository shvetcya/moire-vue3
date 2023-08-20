<template>
    <div class="cart__block">
        <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
            Итого:
            <span>{{ $filters.numberFormat(allPrice) }} ₽</span>
        </p>

        <button
            class="cart__button button button--primery"
            type="submit"
            @click="router.push({ name: 'order' })"
        >
            Оформить заказ
        </button>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { toRefs } from "vue";

export default {
    props: ["allPrice"],
    setup(props) {
        const router = useRouter();
        const { allPrice } = toRefs(props);
        return { router, allPrice };
    },
};
</script>

<style lang="scss" scoped>
</style>
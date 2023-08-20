<template>
    <ul class="catalog__pagination pagination">
        <li class="pagination__item">
            <button
                class="pagination__link pagination__link--arrow"
                :class="{ 'pagination__link--disabled': thisPage === 1 }"
                @click.prevent="decrementPage"
                aria-label="Предыдущая страница"
            >
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-left"></use>
                </svg>
            </button>
        </li>
        <li class="pagination__item" v-for="i in pageAll" :key="i">
            <a
                class="pagination__link"
                :class="{ 'pagination__link--current': thisPage === i }"
                @click.prevent="page(i)"
            >
                {{ i }}
            </a>
        </li>

        <li class="pagination__item">
            <button
                class="pagination__link pagination__link--arrow"
                :class="{ 'pagination__link--disabled': thisPage === pageAll }"
                aria-label="Следующая страница"
                @click.prevent="incrementPage"
            >
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg>
            </button>
        </li>
    </ul>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();

        const thisPage = computed(() => store.state.product.page);
        const pageAll = computed(() => store.state.product.allPage);

        function incrementPage() {
            if (thisPage.value + 1 <= pageAll.value) {
                store.commit("product/setPage", thisPage.value + 1);
            }
        }

        function decrementPage() {
            if (thisPage.value - 1 > 0) {
                store.commit("product/setPage", thisPage.value - 1);
            }
        }

        watch(thisPage, () => {
            store.dispatch("product/getProducts");
        });

        return {
            page: (item) => store.commit("product/setPage", item),
            pageAll,
            thisPage,
            incrementPage,
            decrementPage,
        };
    },
};
</script>

<style lang="scss" scoped>
.pagination__link {
    background-color: transparent;
    cursor: pointer;
}
.pagination__link--disabled {
    cursor: default;
}
</style>
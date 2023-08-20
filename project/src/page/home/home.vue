<template>
<div>
  <Header />
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">
          {{ allGoods + " " + $filters.declOfNum(allGoods, allDeclination) }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <sort-block />
      <section class="catalog">
        <ul class="catalog__list">
          <item-of-goods />
        </ul>
        <pagination />
      </section>
    </div>
  </main>
  <Footer />
</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import sortBlock from "@/page/home/components/sortBlock/sortBlock";
import itemOfGoods from "@/page/home/components/items/itemOfGoods";
import pagination from "@/page/home/components/pagination";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Header,
    Footer,
    sortBlock,
    itemOfGoods,
    pagination,
  },

  setup() {
    const store = useStore();
    const allDeclination = ["товар", "товара", "товаров"];
    return {
      allGoods: computed(() => store.state.product.allGoods),
      allDeclination,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss" scoped>
</style>
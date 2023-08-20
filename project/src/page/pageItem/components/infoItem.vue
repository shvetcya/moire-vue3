<template>
    <div class="item__content">
        <h3>Состав:</h3>

        <p>
            <template v-for="material in item.materials" :key="material.id">
                {{ material.title }} <br />
            </template>
        </p>

        <h3>Уход:</h3>

        <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
        </p>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    props: ["item"],
    setup(props) {
        const item = ref(props.item);

        return { item };
    },
};
</script>

<style lang="scss" scoped>
</style>
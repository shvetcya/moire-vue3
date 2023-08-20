<template>
    <div
        class="btn-add-goods-icon"
        :class="{
            'btn-add-goods-icon__process':
                state.state == 'process' && state.id == item.id,
            'btn-add-goods-icon__ok':
                state.state == 'ok' && state.id == item.id,
        }"
    ></div>
</template>

<script>
import { toRefs } from "vue";

export default {
    props: ["item", "state"],
    setup(props) {
        const { item } = toRefs(props);
        const { state } = toRefs(props);
        return { state, item };
    },
};
</script>

<style lang="scss" scoped>
.btn-add-goods-icon {
    width: 30px;
    height: 30px;
    margin-left: auto;

    background: url("/img/svg/basket.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    border: none;
    outline: none;

    cursor: pointer;

    opacity: 0.5;
    transition: opacity 0.3s;
}
.btn-add-goods-icon__process {
    background: url("/img/svg/loading.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    animation: loading 3s linear infinite;
}
.btn-add-goods-icon__ok {
    background: url("/img/svg/ok.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

.btn-add-goods:hover > .btn-add-goods-icon,
.btn-add-goods:focus > .btn-add-goods-icon {
    opacity: 1;
    transition: opacity 0.3s;
}

@keyframes loading {
    0% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
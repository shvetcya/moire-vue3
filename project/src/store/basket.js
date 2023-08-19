import axios from "axios";
import {
    urlAPI
} from '@/urlAPI.js';

export const basket = {
    state: () => ({
        userAccessKey: null,
        basket: [],
        orderData: [],
        basketStatus: '',
        allPrice: 0,
        allGoodsBasket: 0,
    }),
    mutations: {
        resetBasket(state, basket) {
            state.basket = basket;
        },

        setAllGoodsBasket(state, allGoodsBasket) {
            state.allGoodsBasket = allGoodsBasket;
        },

        setOrederData(state, orderData) {
            state.orderData = orderData;
        },
        setUserAccessKey(state, userAccessKey) {
            state.userAccessKey = userAccessKey;
        },

        setBasketStatus(state, basketStatus) {
            state.basketStatus = basketStatus
        },
        setAllPrice(state, allPrice) {
            state.allPrice = allPrice;
        }
    },
    actions: {
        reloadBaskets(context) {
            const accessKey = localStorage.getItem('userKey');

            if (accessKey) {
                context.commit('setUserAccessKey', accessKey)
            }

            axios({
                    method: 'GET',
                    url: urlAPI + "baskets",
                    params: {
                        userAccessKey: context.state.userAccessKey,
                    }
                })

                .then(async response => {
                    if (context.state.userAccessKey === null) {
                        context.commit('setUserAccessKey', response.data.user.accessKey)
                        localStorage.setItem('userKey', response.data.user.accessKey)
                    }
                    await context.commit('resetBasket', response.data.items)
                    await context.dispatch('allPrice');
                    await context.dispatch('allCountGoods');
                })
        },

        addGoodsBaket(context, goodsArr) {
            axios({
                method: 'POST',
                url: urlAPI + "baskets/products",
                data: {
                    productId: String(goodsArr.id),
                    colorId: String(goodsArr.colorId),
                    sizeId: String(goodsArr.sizeId),
                    quantity: String(goodsArr.quantity),
                },
                params: {
                    userAccessKey: context.state.userAccessKey,
                },
            }).catch((err) => {
                context.commit('setBasketStatus', err)
            }).then(() => {
                context.dispatch('reloadBaskets');

            });
        },

        changeGoods(context, goodsArr) {
            return axios({
                method: 'PUT',
                url: urlAPI + "baskets/products",
                data: {
                    basketItemId: String(goodsArr.basketId),
                    quantity: String(goodsArr.quantity),
                },
                params: {
                    userAccessKey: context.state.userAccessKey,
                },
            }).catch((err) => {
                context.commit('setBasketStatus', err)
            }).then(() => {
                context.dispatch('reloadBaskets');

            });
        },

        async submit(context, data) {
            const basket = context.state.basket;

            const result = basket.filter(
                (el) => {
                    el.product.id == data.product.id
                }
            );

            if (result.length == 0) {
                await context.dispatch("addGoodsBaket", data.goodsArr);
            } else {
                data.goodsArr.basketId = result[0].id;
                data.goodsArr.quantity += result[0].quantity;
                await context.dispatch("changeGoods", data.goodsArr);
            }
        },

        product(context, id) {
            return axios.get(urlAPI + "products/" + id)
        },

        allPrice(context) {
            const result = context.state.basket.reduce((prev, curr) => {
                return prev + curr.price * curr.quantity;
            }, 0)

            context.commit('setAllPrice', result)
        },

        allCountGoods(context) {
            const result = context.state.basket.reduce((prev, curr) => {
                return prev + curr.quantity;
            }, 0)

            context.commit('setAllGoodsBasket', result)
        }
    },
    getters: {
        userAccessKey: (state) => state.userAccessKey
    },
    namespaced: true,
}
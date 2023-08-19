import axios from "axios";
import {
    urlAPI
} from '@/urlAPI.js';

export const catalogStore = {
    state: () => ({
        //активная страница и всего страниц
        page: 1,
        allPage: 0,
        allGoods: 0,
        //сортировка
        priceMin: 0,
        priceMax: 0,
        sortId: 0,
        materialId: [],
        collectionId: [],
        //список товары и колличество отображаймых
        products: [],
        productShow: 6,
        //состояния загрузки и ошибки при получении товаров
        loadingProduct: false,
        loadingProductError: false,
    }),
    mutations: {
        setPage(state, page) {
            state.page = page
        },
        setAllPage(state, allPage) {
            state.allPage = allPage
        },
        setProducts(state, products) {
            state.products = products
        },
        setAllGoods(state, allGoods) {
            state.allGoods = allGoods
        },

        setProductShow(state, productShow) {
            state.productShow = productShow
        },

        setPriceMin(state, priceMin) {
            state.priceMin = priceMin
        },
        setPriceMax(state, priceMax) {
            state.priceMax = priceMax
        },
        setSortId(state, sortId) {
            state.sortId = sortId
        },
        setMaterialId(state, materialId) {
            state.materialId = materialId
        },
        setCollectionId(state, collectionId) {
            state.collectionId = collectionId
        },

    },
    actions: {
        getProducts(context) {
            this.state.product.loadingProduct = true;
            this.state.product.products = [];

            return axios
                .get(urlAPI + 'products', {
                    params: {
                        //старт страница и колличества строница 
                        page: this.state.product.page,
                        limit: this.state.product.productShow,
                        //сортировка
                        categoryId: this.state.product.sortId,
                        materialIds: this.state.product.materialId,
                        seasonIds: this.state.product.collectionId,
                        minPrice: this.state.product.priceMin,
                        maxPrice: this.state.product.priceMax,
                    }
                })
                .catch(() => {
                    this.state.product.loadingProductError = true;
                })
                .then(response => {
                    this.state.product.loadingProduct = false;

                    if (response.status > 199 && response.status < 300) {
                        context.commit('setProducts', response.data.items);
                        context.commit('setAllPage', response.data.pagination.pages);
                        context.commit('setAllGoods', response.data.pagination.total);
                        this.state.product.loadingProductError = false;
                    }
                })
        },
    },
    namespaced: true,
}
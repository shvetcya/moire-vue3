import axios from "axios";
import {
    urlAPI
} from "@/urlAPI.js";

export const state = {
    state: () => ({
        state: {},
    }),
    mutations: {
        setState(state, stat) {
            state.state = stat;
        },

    },
    actions: {
        getStateData(context, id) {
            let key = context.rootGetters['basket/userAccessKey'];
            if (key == null) {
                setTimeout(() => {
                    key = context.rootGetters['basket/userAccessKey'];
                    if (key == null) {
                        getStateData(id)
                    } else {
                        get()
                    }
                }, 2000);
            } else {
                get()
            }

            function get() {
                axios
                    .get(urlAPI + "orders/" + id, {
                        params: {
                            userAccessKey: context.rootGetters['basket/userAccessKey'],
                        },
                    })
                    .then((resp) => {
                        context.commit('setState', resp.data);
                    });
            }
        }
    },
    namespaced: true,
}
export const order = {
    state: () => ({
        ordersData: {
            name: '',
            address: '',
            phone: '',
            email: '',
            comments: '',
        }
    }),
    mutations: {
        setOrders(state, ordersData) {
            const type = ordersData.type;
            const data = ordersData.data;

            state.ordersData[type] = data;
        },
    },
    actions: {},
    namespaced: true,
}
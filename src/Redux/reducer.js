import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'meat', amount: 0 },
        { type: 'cheese', amount: 0 }
    ],
    totalPrice: 80,
    purchassble: false,
    orderLoading: true,
    orderError: false,
    orders: [],
    userId: null,
    token: null
}

const INGREDIENT_PRICES = {
    salad: 20,
    meat: 90,
    cheese: 40
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.ingredients]

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            ingredients.map(
                item => item.type === action.payload ?
                    item.amount++ : item.amount
            )
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: INGREDIENT_PRICES[action.payload] + state.totalPrice
            }
        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
            }

        case actionTypes.UPDATE_PURCHASSBLE:
            const sum = ingredients.reduce((sum, item) =>
                sum + item.amount, 0
            )
            return {
                ...state,
                purchassble: sum > 0
            }

        case actionTypes.RESET_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'meat', amount: 0 },
                    { type: 'cheese', amount: 0 }
                ],
                totalPrice: 80,
                purchassble: false
            }

        case actionTypes.LOAD_ORDER:
            const orders = []
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                })
            }
            // console.log(orders);
            return {
                ...state,
                orders: orders,
                orderLoading: false
            }

        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderError: true,
                orderLoading: false
            }

        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
            
        default:
            return state
    }
}
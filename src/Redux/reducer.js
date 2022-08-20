import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'meat', amount: 0 },
        { type: 'cheese', amount: 0 }
    ],
    totalPrice: 80,
    purchassble: false
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
            ingredients.map(item => {
                if (item.type === action.payload) {
                    if (item.amount <= 0) {
                        return state
                    }
                    item.amount--
                }
            })
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

        default:
            return state
    }
}
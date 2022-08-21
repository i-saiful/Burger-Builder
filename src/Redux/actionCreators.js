import * as actionTypes from './actionTypes';

export const addIngredient = igType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igType
    }
}

export const removeIngredient = igType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType
    }
}

export const updatePurchassble = () => {
    return {
        type: actionTypes.UPDATE_PURCHASSBLE
    }
}

export const resetIngredient = () => {
    return {
        type: actionTypes.RESET_INGREDIENT
    }
}

export const loadOrder = orders => {
    return {
        type: actionTypes.LOAD_ORDER,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED
    }
}

export const fetchOrders = () => dispatch => {
    fetch('https://burger-builder-55d2b-default-rtdb.firebaseio.com/orders.json')
    .then(response => response.json())
    .then(data => dispatch(loadOrder(data)))
}
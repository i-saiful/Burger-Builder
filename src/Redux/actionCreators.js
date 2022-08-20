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
import React from 'react';
import Ingredient from '../Ingredient/Ingredient.js';
import './Burger.css'

function Burger(props) {
    let ingredientArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()]
        return amountArr.map(() =>
            <Ingredient type={item.type} key={Math.random()} />
        )
    }).reduce((arr, item) =>
        [...arr, ...item], []
    )
    // console.log(ingredientArr);
    if(!ingredientArr.length) {
        ingredientArr = <p>Please add somthing</p>
    }
    return (
        <div className='Burger'>
            <Ingredient type='bread-top' />
            {ingredientArr}
            <Ingredient type='bread-bottom' />
        </div>
    )
}

export default Burger
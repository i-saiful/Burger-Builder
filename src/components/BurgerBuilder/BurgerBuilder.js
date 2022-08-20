import React, { Component } from 'react'
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';

export class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'meat', amount: 0 },
            { type: 'cheese', amount: 0 }
        ]
    }

    addIngredientHandle = type => {
        console.log(type);
    }

    render() {
        return (
            <div className='d-flex flex-column flex-md-row'>
                <Burger ingredients={this.state.ingredients} />
                <Controls 
                ingredientAdded = {this.addIngredientHandle}
                />
            </div>
        )
    }
}

export default BurgerBuilder
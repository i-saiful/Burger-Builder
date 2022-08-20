import React, { Component } from 'react'
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import {
    Modal, 
    Button, 
    ModalBody, 
    ModalFooter, 
    ModalHeader
} from 'reactstrap'

const INGREDIENT_PRICES = {
    salad: 20,
    meat: 90,
    cheese: 40
}

export class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'meat', amount: 0 },
            { type: 'cheese', amount: 0 }
        ],
        totalPrice: 80,
        modalOpen: false,
        purchassble: false
    }

    updatePurchassble = ingredients => {
        const sum = ingredients.reduce((sum, item) => 
            sum + item.amount, 0
        )
        
        this.setState({
            purchassble: sum > 0
        })
    }

    addIngredientHandle = type => {
        const ingredients = [...this.state.ingredients]
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        ingredients.map(item => item.type === type ? item.amount++ : item.amount)
        // console.log(newPrice);
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        })
        this.updatePurchassble(ingredients)
    }

    removeIngredientHandle = type => {
        const ingredients = [...this.state.ingredients]
        let newPrice = this.state.totalPrice;
        if (newPrice >= 80) {
            if (newPrice - INGREDIENT_PRICES[type] >= 80) {
                newPrice = newPrice - INGREDIENT_PRICES[type]
            }
        }
        ingredients.map(item => item.type === type ?
            item.amount ? item.amount-- : item.amount : item.amount)
        // console.log(ingredients);
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        })
        this.updatePurchassble(ingredients)
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        return (
            <div>
                <div className='d-flex flex-column flex-md-row'>
                    <Burger ingredients={this.state.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.state.totalPrice}
                        toggleModal={this.toggleModal}
                        purchassble={this.state.purchassble}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your order summary</ModalHeader>
                    <ModalBody>
                        <Summary ingredients={this.state.ingredients} />
                        <h5>Total Price: {this.state.totalPrice} BDT</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={this.toggleModal}>
                            Continue to checkout
                        </Button>
                        <Button color='secondary' onClick={this.toggleModal} >
                            Cancle
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default BurgerBuilder
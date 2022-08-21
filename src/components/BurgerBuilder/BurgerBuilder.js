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
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    addIngredient,
    removeIngredient,
    updatePurchassble
} from '../../Redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        purchassble: state.purchassble,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToPosps = dispatch => {
    return {
        addIngredient: (igType) => dispatch(addIngredient(igType)),
        removeIngredient: (igType) => dispatch(removeIngredient(igType)),
        updatePurchassble: () => dispatch(updatePurchassble())
    }
}

export class BurgerBuilder extends Component {
    state = {
        modalOpen: false
    }

    addIngredientHandle = type => {
        this.props.addIngredient(type)
        this.props.updatePurchassble()
    }

    removeIngredientHandle = type => {
        this.props.removeIngredient(type)
        this.props.updatePurchassble()
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
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchassble={this.props.purchassble}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your order summary</ModalHeader>
                    <ModalBody>
                        <Summary ingredients={this.props.ingredients} />
                        <h5>Total Price: {this.props.totalPrice} BDT</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/checkout" >
                            <Button style={{ backgroundColor: '#d70f64' }}>
                                Continue to checkout
                            </Button>
                        </Link>
                        <Button color='secondary' onClick={this.toggleModal} >
                            Cancle
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToPosps)(BurgerBuilder)
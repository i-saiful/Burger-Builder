import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './BurgerBuilder/Orders/Checkout/Checkout';
import Orders from './BurgerBuilder/Orders/Orders';
import Auth from './Auth/Auth';
import {
    Routes,
    Route,
} from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    token: state.token
})

function Main(props) {
    let routes = (
        <Routes>
            <Route path='/login' element={<Auth />} />
            <Route path="*" element={<Auth />} />
        </Routes>
    )

    if (props.token) {
        routes = (
            <Routes>
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/orders' element={<Orders />} />
                <Route exact path='/' element={<BurgerBuilder />} />
                <Route path='*' element={<BurgerBuilder />} />
            </Routes>
        )
    }
    return (
        <div>
            <Header />
            <div className="container">
                {routes}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Main)
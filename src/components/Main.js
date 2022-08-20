import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './BurgerBuilder/Orders/Checkout/Checkout';
import Orders from './BurgerBuilder/Orders/Orders';
import {
    Routes,
    Route
} from "react-router-dom";

function Main() {
    return (
        <div>
            <Header />
            <div className="container">
                <Routes>
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route exact path='/' element={<BurgerBuilder />} />
                </Routes>
            </div>
        </div>
    )
}

export default Main
import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './BurgerBuilder/Orders/Checkout/Checkout';
import Orders from './BurgerBuilder/Orders/Orders';
import Auth from './Auth/Auth';
import {
    Routes,
    Route, Navigate
} from "react-router-dom";
import { connect } from 'react-redux';
import { authCheck } from '../Redux/authActionCreators';
import Logout from './Auth/Logout';

const mapStateToProps = state => ({
    token: state.token
})

const mapDispatchToProps = dispatch => ({
    authCheck: () => dispatch(authCheck())
})

class Main extends Component {
    componentDidMount() {
        this.props.authCheck()
        // console.log(this.props); // console log
    }

    render() {
        let routes = (
            <Routes>
                <Route path='/login' element={<Auth />} />
                <Route path='*' element={<Navigate to="/login" replace />} />
            </Routes>
        )

        if (this.props.token) {
            routes = (
                <Routes>
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route exact path='/' element={<BurgerBuilder />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
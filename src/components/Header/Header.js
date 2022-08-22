import React from 'react';
import { NavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import './Header.css'
import Logo from '../../assets/logo.png'
import { connect } from 'react-redux';

const matStateToProps = state => ({
    token: state.token
})

function Header(props) {
    let links = (
        <Nav className='mr-md-5'>
            <NavItem>
                <NavLink exact='true' to='/login' className='NavLink'>
                    Login
                </NavLink>
            </NavItem>
        </Nav>
    )
    if (props.token) {
        links = (
            <Nav className='mr-md-5'>
                <NavItem>
                    <NavLink exact='true' to='/' className='NavLink'>
                        Burger Builder
                    </NavLink>
                    <NavLink exact='true' to='/orders' className='NavLink'>
                        Orders
                    </NavLink>
                    <NavLink exact='true' to='/logout' className='NavLink'>
                        Logout
                    </NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className='Navigation'>
            <Navbar style={{
                backgroundColor: '#d70f64',
                height: '70px'
            }}>
                <NavbarBrand
                    to='/'
                    className='mr-auto ml-md-5 Brand'
                >
                    <img src={Logo} alt="logo" width="80px" />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}

export default connect(matStateToProps)(Header)
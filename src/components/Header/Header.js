import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import './Header.css'
import Logo from '../../assets/logo.png'

function Header() {
    return (
        <div className='Navigation'>
            <Navbar style={{
                backgroundColor: '#d70f64',
                height: '70px'
            }}>
                <NavbarBrand
                    href='/'
                    className='mr-auto ml-md-5 Brand'
                >
                    <img src={Logo} alt="logo" width="80px"/>
                </NavbarBrand>
                <Nav
                    className='mr-md-5'
                >
                    <NavItem>
                        <NavLink href='#' className='NavLink'>somethin</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header
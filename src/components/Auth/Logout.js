import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Navigate, Routes } from 'react-router-dom';
import { logout } from '../../Redux/authActionCreators';

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return (
            <Routes>
                <Route to='/*' element={<Navigate to="/" replace />} />
            </Routes>
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout)
import React, { Component } from 'react';
import { Formik } from 'formik';
import { auth } from '../../Redux/authActionCreators';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';

const mapDicpatchToProps = dispatch => ({
    auth: (email, password, mode) => dispatch(auth(email, password, mode))
})

const mapStateToProps = state => ({
    authLoading: state.authLoading,
    authFailedMsg: state.authFailedMsg
})

class Auth extends Component {
    state = {
        mode: 'Sign Up'
    }

    handlerSwitchMod = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }

    render() {
        let errorMsg = null;
        if (this.props.authFailedMsg) {
            errorMsg = <Alert color='danger'>
                {this.props.authFailedMsg}
            </Alert>
        }

        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                    onSubmit={({ email, password }) =>
                        this.props.auth(email, password, this.state.mode)
                    }
                    validate={(values) => {
                        const error = {}
                        if (!values.email) {
                            error.email = 'required'
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            error.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            error.password = 'required'
                        } else if (values.password.length < 4) {
                            error.password = 'must be atlest 4 character'
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.confirmPassword) {
                                error.confirmPassword = 'required'
                            } else if (values.confirmPassword !== values.password) {
                                error.confirmPassword = 'password feild does not match'
                            }
                        }

                        return error
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) =>
                        <div
                            style={{
                                border: "1px solid gray",
                                boxShadow: '1px 1px #888',
                                borderRadius: '5px',
                                padding: '20px'
                            }}
                        >
                            <button className='btn mb-3'
                                style={{
                                    backgroundColor: '#d70f60',
                                    width: "100%",
                                }}
                                onClick={this.handlerSwitchMod}
                            >
                                Switch to {
                                    this.state.mode === 'Sign Up' ? 'Login' : 'Sign Up'
                                }
                            </button>
                            <form
                                onSubmit={handleSubmit}

                            >

                                <input
                                    type="email"
                                    name='email'
                                    placeholder='your email'
                                    className='form-control'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: 'red' }}>{errors.email}</span>

                                <input
                                    type="text"
                                    name='password'
                                    placeholder='your password'
                                    className='form-control mt-3'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: 'red' }}>{errors.password}</span>
                                {this.state.mode === "Sign Up" ? <div>
                                    <input
                                        type="text"
                                        name='confirmPassword'
                                        placeholder='your confirm Passowrd'
                                        className='form-control mt-3'
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <span style={{ color: 'red' }}>{errors.confirmPassword}</span>

                                </div> : null}
                                <br />
                                <button
                                    type='submit'
                                    className='btn btn-success mt-3'
                                >
                                    {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                                </button>
                            </form>
                        </div>}
                </Formik>
            )
        }

        return (
            <>
                {errorMsg}
                {form}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDicpatchToProps)(Auth)
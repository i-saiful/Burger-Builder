import * as actionTypes from './actionTypes'

const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: { token, userId }
})


export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email, password,
        returnSecureToken: true
    }
    let api = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    const apiKey = 'AIzaSyCFEFep3SE6D7WIe5gSRxtL9H1ejLc79RU'
    if (mode === 'Sign Up') {
        api = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    }

    const endPoint = api + apiKey

    fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify(authData)
    }).then(response =>
        response.json()
    ).then(data => {
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.loacalId)
        const expirationTime = new Date(new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('expirationTime', expirationTime)
        dispatch(authSuccess(data.idToken, data.loacalId))
        // console.log(data)
    })
}

export const logout = () => {
    localStorage.clear()
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if (new Date() <= expirationTime) {
            // set validation
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token, userId))
        } else {
            // Logut
            dispatch(logout())
        }
    } else {
        // Logout
        dispatch(logout())
    }
}
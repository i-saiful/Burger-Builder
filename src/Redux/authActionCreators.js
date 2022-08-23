import * as actionTypes from './actionTypes'

const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: { token, userId }
})


export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true))

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
        dispatch(authLoading(false))
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        const expirationTime = new Date(new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('expirationTime', expirationTime)
        dispatch(authSuccess(data.idToken, data.localId))
        // console.log('auth action createor'); // Hits
        // console.log(data.idToken, 'localid: ', data.localId) // check id, token 

        // error catch
        if (data.error.code === 400) {
            dispatch(authFailed(data.error.message))
        }
    }).catch(error => {
        // console.log(error.status)
        dispatch(authLoading(false))
    })
}

export const logout = () => {
    localStorage.clear()
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLoading = isLoading => ({
    type: actionTypes.AUTH_LOADING,
    payload: isLoading
})

export const authFailed = errorMessage => ({
    type: actionTypes.AUTH_FAILED,
    payload: errorMessage
})

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
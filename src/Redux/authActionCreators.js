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
    ).then(data =>
        dispatch(authSuccess(data.idToken, data.loacalId))
        // console.log(data)
    )
}
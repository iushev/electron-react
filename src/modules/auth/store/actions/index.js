import api from '../../../../api';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';

export const authUser = (token, user, rememberMe) => {
    return {
        type: AUTH_USER,
        token,
        user,
        rememberMe,
    };
};

export const signInUser = (username, password, rememberMe)  => {
    return (dispatch) => {
        return api.auth.sign_in(username, password)
            .then((result) => {
                dispatch(authUser(result.token, result.user, rememberMe));
                return result;
            });
    };
};

export const unauthUser = () => {
    return {
        type: UNAUTH_USER,
    };
};

export const signOutUser = ()  => {
    return (dispatch) => {
        return api.auth.sign_out()
            .then((response) => {
                dispatch(unauthUser());
                return response;
            });
    };
};

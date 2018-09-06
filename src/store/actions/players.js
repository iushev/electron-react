import api from '../../api';
import { authUser, unauthUser } from '../../modules/auth/store/actions';

export const signInPlayer = (username, password, rememberMe)  => {
    return (dispatch) => {
        return api.players.sign_in(username, password)
            .then((result) => {
                dispatch(authUser(result.token, result.user, rememberMe));
                return result;
            });
    };
};

export const signOutPlayer = ()  => {
    return (dispatch) => {
        return api.players.sign_out()
            .then((response) => {
                dispatch(unauthUser());
                return response;
            });
    };
};

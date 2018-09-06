import api from '../../../../api';

export const FETCHING_USER = 'FETCHING_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR';
export const CLEAR_USER = 'CLEAR_USER';

export const fetchingUser = (userId) => ({
    type: FETCHING_USER,
    userId,
});

export const receiveUser = (userId, data) => ({
    type: RECEIVE_USER,
    userId,
    data,
});

export const fetchingUserError = (userId, error) => ({
    type: FETCHING_USER_ERROR,
    userId,
    error,
});

export const clearUser = (userId) => ({
    type: CLEAR_USER,
    userId,
});


export const fetchUser = (userId) => {
    return (dispatch) => {
        dispatch(fetchingUser(userId));
        return api.user.get(userId)
            .then((response) => {
                dispatch(receiveUser(userId, response.data));
                return response;
            })
            .catch((err) => {
                dispatch(fetchingUserError(userId, err.message));
                return err;
            });
    };
};

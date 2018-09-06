import { fetchingData, receiveData, fetchingDataError } from '../../../../store/actions/dataList';
import api from '../../../../api';

export const fetchUsers = (dataList) => (params = {}) => {
    return (dispatch) => {
        dispatch(fetchingData(dataList));
        return api.auth.user.list({
            params: params,
        })
            .then((response) => {
                dispatch(receiveData(dataList, response.data));
                return response;
            })
            .catch((err) => {
                dispatch(fetchingDataError(dataList, err.message));
                return err;
            });
    };
};

export const CHECKING_FOR_UPDATE = 'CHECKING_FOR_UPDATE';
export const UPDATE_NOT_AVAILABLE = 'UPDATE_NOT_AVAILABLE';
export const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
export const DOWNLOAD_PROGRESS = 'DOWNLOAD_PROGRESS';
export const UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';
export const CHECKING_FOR_UPDATE_DONE = 'CHECKING_FOR_UPDATE_DONE';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export const checkingForUpdate = () => ({
    type: CHECKING_FOR_UPDATE,
});

export const updateAvailable = (info) => ({
    type: UPDATE_AVAILABLE,
    info,
});

export const _updateNotAvailable = (info) => ({
    type: UPDATE_NOT_AVAILABLE,
    info,
});

export const _checkingForUpdateDone = () => ({
    type: CHECKING_FOR_UPDATE_DONE,
});

export const updateNotAvailable = (info) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(_updateNotAvailable(info));
            setTimeout(() => {
                dispatch(_checkingForUpdateDone(info));
            }, 300);
        }, 600);
    };
};

export const updateError = (error) => ({
    type: UPDATE_ERROR,
    error,
});

export const downloadProgress = (progressObj) => ({
    type: DOWNLOAD_PROGRESS,
    progressObj,
});

export const updateDownloaded = () => ({
    type: UPDATE_DOWNLOADED,
});

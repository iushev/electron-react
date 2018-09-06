export const SET_FLASH = 'SET_FLASH';
export const ADD_FLASH = 'ADD_FLASH';
export const REMOVE_FLASH = 'REMOVE_FLASH';

export const setFlash = (key, value) => ({
    type: SET_FLASH,
    key,
    value,
});

export const addFlash = (key, value) => ({
    type: ADD_FLASH,
    key,
    value,
});

export const removeFlash = (key) => ({
    type: REMOVE_FLASH,
    key,
});

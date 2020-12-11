export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const getSetMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const getClearMessage = () => ({
    type: CLEAR_MESSAGE
})


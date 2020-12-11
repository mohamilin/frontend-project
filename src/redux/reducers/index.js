import {combineReducers} from "redux";
import message from "./messageReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    message,
    authReducer
});

export default rootReducer;
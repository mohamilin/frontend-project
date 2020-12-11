import {SET_MESSAGE, CLEAR_MESSAGE} from "../actions/varTypes";

const initialState = {};

/** versi lain */
// export default function message(state = initialState, action) {
//     const {type, payload} = action
//     switch (type){
//         case SET_MESSAGE :
//             return{
//                 ...state,
//                 message: payload
//             }
//         case CLEAR_MESSAGE: 
//             return {
//                 ...state,
//                 message: payload
//             }
//         default :
//             return state;
//     }
// }


export default function message(state = initialState, action) {
    switch (action.type){
        case SET_MESSAGE :
            return{
                ...state,
                message: action.payload
            }
        case CLEAR_MESSAGE: 
            return {
                ...state,
                message: action.payload
            }
        default :
            return state;
    }
}
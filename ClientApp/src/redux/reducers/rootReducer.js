import { getCookie } from '../../auxilliary/cookieFunctions';

const initialState = {
    userName: "",
    fullName: "",
    isLoggedIn: "false"
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case("LOG_IN_USER"): {
            return {
                ...state,
                userName: action.userName,
                fullName: action.fullName,
                isLoggedIn: 'true'
            }
        }
        case("SET_COOOKIE_USER_DATA_STATE"): {
            return {
                ...state,
                userName: getCookie('user', 'userName'),
                fullName: getCookie('user', 'fullName'),
                isLoggedIn: getCookie('user', 'isLoggedIn')
            }
        }
        case("LOG_OUT_USER"): {
            return {
                ...state,
                userName: action.userName,
                fullName: action.fullName,
                isLoggedIn: action.isLoggedIn
            }
        }
        default: return state;
    }
}
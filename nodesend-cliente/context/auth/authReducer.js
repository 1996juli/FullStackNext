import { 
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_ERROR,
    USER_AUTHENTICATED,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    HIDE_ALERT,
    CLOSE_SESSION,
} from '../../types';

const authReducer  = (state, action) => {
    switch(action.type) {
        case LOGIN_ERROR:
        case REGISTRATION_SUCCESSFUL:
        case REGISTRATION_ERROR:
            return {
                ...state,
                message: action.payload,
            } 
        case LOGIN_SUCCESSFUL:
        
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case CLOSE_SESSION: 
        localStorage.removeItem('token');
            return {
                ...state,
                user: null, 
                token: null,
                authenticated: null,
        }
        case HIDE_ALERT:
            return {
                ...state,
               message: null 
            } 
        default:
            return state;
    }
}

export default authReducer;
import {
    SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE,
    UPLOAD_SUCCESSFUL_FILE,
    UPLOAD_FILE_ERROR,
    CREATE_SUCCESSFUL_LINK,
    CREATE_LINK_ERROR,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS,
} from '../../types';

const appReducer = (state, action) => {
    switch(action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message_file: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                message_file: null
            }
        case UPLOAD_FILE:
            return {
                ...state,
                loading: true,
            }
        case UPLOAD_SUCCESSFUL_FILE:
            return {
                ...state,
                name: action.payload.name,
                name_original: action.payload.name_original,
                loading: null,
            }
        case UPLOAD_FILE_ERROR:
            return {
                ...state,
                message_file: action.payload,
                loading: null,
            }
        case CREATE_SUCCESSFUL_LINK:
            return {
                ...state,
                url: action.payload
            }
        case CLEAN_STATE:
            return {
                ...state,
                message_file: null,
                name: '',
                name_original:'',
                loading: null,
                download: 1,
                password: '',
                author: null,
                url: ''
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                download: action.payload
            }
        default:
            return state
    }
}

export default appReducer;
import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import {
    SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE,
    UPLOAD_SUCCESSFUL_FILE,
    UPLOAD_FILE_ERROR,
    CREATE_SUCCESSFUL_LINK,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS,
} from '../../types';
import clienteAxios from '../../config/axios';

const AppState = ({children}) => {

    const initialState = {
        message_file: null,
        name: '',
        name_original:'',
        loading: null,
        download: 1,
        password: '',
        author: null,
        url: ''
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Muestra una alerta 
    const showAlert = msg => {
        console.log(msg)
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    // Sube los archivos al servidor
    const uploadFile = async (formData, nameFile) => {
        
        dispatch({
            type: UPLOAD_FILE
        })

        try {
            const result = await clienteAxios.post('/api/files', formData);
            // console.log(result.data);   
            
            dispatch({
                type: UPLOAD_SUCCESSFUL_FILE,
                payload: {
                    name: result.data.file,
                    name_original: nameFile
                }
            })

        } catch (error) {
            // console.log(error);
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // crea un enlace una vez que se subió el archivo
    const createLink = async () => {
        const data = {
            name: state.name,
            name_original: state.name_original,
            download: state.download,
            password: state.password,
            author: state.author,
        }
        
        //console.log(data);

        try {
            const result = await clienteAxios.post('/api/links', data);
            //console.log(result)
            dispatch({
                type: CREATE_SUCCESSFUL_LINK,
                payload: result.data.msg
            });
        } catch (error) {
            console.log(error);
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        })
    }

    // // Agregue el password
    const addPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }

    // // agrega un número de descargas
    const addDownloads = downloads => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        })
    }

    return (
        <appContext.Provider
            value={{
                message_file: state.message_file,
                name: state.name,
                name_original: state.name_original,
                loading: state.loading,
                download: state.download,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                cleanState,
                addPassword,
                addDownloads,
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;
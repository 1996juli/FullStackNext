import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
    REGISTRATION_SUCCESSFUL,
    REGISTRATION_ERROR,
    USER_AUTHENTICATED,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    HIDE_ALERT,
    CLOSE_SESSION,
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        authenticated: null,
        user: null,
        message: null,
    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios
    const registerUser = async data => {
        //console.log(data);
        try {
            const result = await clienteAxios.post('/api/users', data);
            //console.log(result)
            dispatch({
                type: REGISTRATION_SUCCESSFUL,
                payload: result.data.token
            });

            userAuthenticated();
            
        } catch (error) {
            console.log(error)

            dispatch({
                type: REGISTRATION_ERROR,
                payload:error.response.data.msg,
            })
        }

        

        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    // Autenticar Usuarios
    const startSession = async data => {
        try {
            const result = await clienteAxios.post('/api/auth', data);
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: result.data.token
            })
        } catch (error) {
            //console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
        
    }

     // Retorne el Usuario autenticado en base al JWT
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        //console.log(token)
        if(token) {
            tokenAuth(token)
        }

        try {
            const result = await clienteAxios.get('/api/auth');
            //console.log(result.data.user)
                      
            if(result.data.user) {
                dispatch({
                    type: USER_AUTHENTICATED,
                    payload: result.data.user
                }) 
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    // Cerrar la sesión
    const closeSession = () => {
        dispatch({
            type: CLOSE_SESSION,
        })
    }

    return (
        <authContext.Provider
            value={{ 
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registerUser,
                startSession,
                userAuthenticated,
                closeSession,
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;
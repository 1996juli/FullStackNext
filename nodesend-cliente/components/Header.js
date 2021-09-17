import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';

const Header = () => {

    // routing 
    const router = useRouter();

    // Extraer el Usuario autenticado del Storage 
    const AuthContext = useContext( authContext );
    const { user, userAuthenticated , closeSession } = AuthContext;

    // Context de la aplicación
    const AppContext = useContext( appContext );
    const { cleanState } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if(token) {
          userAuthenticated();
        }
        
    }, []);

    const  redirect = () => {
        router.push('/');
        cleanState();
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img 
                onClick={() => redirect() }
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" 
            />

            <div>
                { user ? (
                    <div className="flex items-center">
                        <p className="mr-2">Hello {user.name}</p>
                        <button 
                            type="button"
                            className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                            onClick={() => closeSession() }
                        >Close Session </button>
                    </div>
                ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Start Session</a>
                            </Link>
                            <Link href="/crearcuenta">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Create account</a>
                            </Link>
                        </>
                    )
                }
            </div>
            
        </header>
     );
}
 
export default Header;
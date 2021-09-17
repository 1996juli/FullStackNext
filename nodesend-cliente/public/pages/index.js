import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
// import Alerta from '../components/Alerta';
// import Dropzone from '../components/Dropzone';
import authContext from '../context/auth/authContext';
// import appContext from '../context/app/appContext';
// import Link from 'next/link';


const Index = () => {

  // Extraer el Usuario autenticado del Storage 
  const AuthContext = useContext( authContext );
  const { usuarioAutenticado } = AuthContext;

  useEffect(() => {
    const token = localStorage.getItem('token');
      if(token) {
        usuarioAutenticado()
      }
  }, []);

  return ( 
      <Layout>
          <h1>Index</h1>
      </Layout>
    );
}
 
export default Index;
import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import React, {useState, useContext } from 'react';
import appContext from '../../context/app/appContext';
import Alert from '../../components/Alert';

export async function getServerSideProps({params}) {
    const { link } = params;

    console.log(link);
   const result = await clienteAxios.get(`/api/links/${link}`);

    console.log(result);

    return {
        props: {
            link: result.data
        }
    }
}

export async function getServerSidePaths() {
    const links = await clienteAxios.get('/api/links');
    return {
        paths: links.data.links.map( link => ( {
            params: { link : link.url }
        })),
        fallback: false
    }
}

export default ({link}) => {

    // Context de la app
    const AppContext = useContext(appContext);
    const {  showAlert , message_file } = AppContext;

    const [ havePassword, setHavePassword ] = useState(link.password);

    const [ password, setPassword ] = useState('');

    console.log(link);

    const checkPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const result = await clienteAxios.post(`/api/links/${link.link}`, data);
            setHavePassword(result.data.password);
        } catch (error) {
            showAlert(error.response.data.msg);
        }
    }

    return (
        <Layout>
            {
                havePassword ? (
                    <>
                        <p className="text-center">This link is protected by a password, place it below</p>

                        { message_file && <Alert /> }
                         
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ e => checkPassword(e) }
                                >
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Password del enlace"
                                            value={password}
                                            onChange={ e => setPassword(e.target.value) }
                                        />
                                    </div>

                                    <input 
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                        value="Validate Password..."
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href={`${process.env.backendURL}/api/files/${link.file}`} 
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                download    
                            >Aquí</a>
                        </div>
                    </>
                )
            }
        </Layout>
    )
}
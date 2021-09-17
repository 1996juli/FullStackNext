import React, {useState, useContext} from 'react';
import appContext from '../context/app/appContext';

const Formulario = () => {

    // Context de la app
    const AppContext = useContext(appContext);
    const { addPassword, addDownloads } = AppContext;

    const [havePassword, setHavePassword] = useState(false);

    return ( 
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Delete then:</label>
                <select defaultValue={'DEFAULT'}
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={ e => addDownloads( parseInt(e.target.value))}
                >
                    <option value="DEFAULT" disabled>-- Select --</option>
                    <option value="1">1 Download</option>
                    <option value="5">5 Downloads</option>
                    <option value="10">10 Downloads</option>
                    <option value="20">20 Downloads</option>
                </select>
                
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Protect with password</label>
                    <input 
                        type="checkbox" 
                        onChange={() => setHavePassword(!havePassword) }
                    />

                </div>
                { havePassword ? (
                    <input 
                        type="password" 
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" 
                        onChange={ e => addPassword(e.target.value) }
                    />
                ) : null }


            </div>

        </div>
     );
}
 
export default Formulario;
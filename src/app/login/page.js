'use client';

import axios from 'axios';
/* Constants */
import { endpoint, toastOptions } from '@/constants/utils';
/* Hooks */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/useAuthContext';
/* React Toastify */
import { toast } from 'react-toastify';

// PÁGINA
/* Login */
const Login = () => {
    /* Navegación */
    const router = useRouter();
    /* Contexto de Autenticación */
    const { login } = useAuthContext();

    // CONSTANTES
    const [ loading, setLoading ] = useState(false);        /* Estado de Carga */
    const [ email, setEmail ] = useState('');               /* Correo Electrónico */
    const [ password, setPassword ] = useState('');         /* Contraseña */

    // FUNCIONES
    /* Funcionalidad de Login */
    const onLogin = async () => {
        // CONDICIONAL
        /* Comprobación del Ingreso de un Email */
        if (email === '') toast.warning('Ups, debe ingresar su email...', toastOptions);
        /* Comprobación del Ingreso de una Contraseña */
        else if (password === '') toast.warning('Ups, debe ingresar su contraseña...', toastOptions);
        else {
            setLoading(true);

            await axios.post(
                `${endpoint}/auth/login`,
                { email, password, },
                { headers: { Accept: 'application/json', }, }
            )
            .then(async (response) => {
                // CONSTANTES
                const token = response.data.access_token;           /* Token */
                const user = response.data.gnaviUser;               /* Usuario */

                login(user, token);
                toast.success('Inicio de Sesión Exitoso', toastOptions);
                router.push('/');
            })
            .catch(() => {
                toast.error('Opps, Credenciales Inválidas', toastOptions);
                setLoading(false);
            });
        }
    }

    // RETORNO
    return (
        <main className='h-screen flex flex-col items-center justify-center'>
            <div className="py-3 relative sm:max-w-xl sm:mx-auto">
		        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-500 shadow-lg transform -skew-y-6 sm:rounded-3xl sm:-rotate-6 sm:skew-y-0"></div>
		        <div className="px-4 py-10 relative bg-white shadow-lg sm:px-20 sm:rounded-3xl">
                    <div className="max-w-md mx-auto">
					    <h1 className="text-pink-600 text-4xl text-center font-bold">Login</h1>

                        <div className="divide-y divide-gray-200">
                            <div className="py-8 space-y-4 text-base text-gray-700 leading-6 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        className="w-full h-10 border-b-2 border-gray-300 peer placeholder-transparent text-gray-900 focus:outline-none focus:borer-pink-600"
                                        id="email"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email..."
                                        required={true}
                                        type="text"
                                        value={email}
                                    />

                                    <label className="absolute -top-3.5 left-0 text-gray-600 text-sm transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600" htmlFor="email">Email</label>
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        className="w-full h-10 border-b-2 border-gray-300 peer placeholder-transparent text-gray-900 focus:outline-none focus:borer-pink-600"
                                        id="password"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Contraseña..."
                                        required={true}
                                        type="password"
                                        value={password}
                                    />

                                    <label className="absolute -top-3.5 left-0 text-gray-600 text-sm transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600" htmlFor="password">Contraseña</label>
                                </div>
                                <div className='pt-4 flex items-center justify-center'>
                                    <button
                                        className="px-5 py-1 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full text-white font-semibold"
                                        disabled={loading}
                                        onClick={() => onLogin()}
                                    >
                                        {// CONDICIONAL
                                        /* Comprobación del Estado de Carga */
                                        !loading ? 'Iniciar Sesión' : 'Cargando...'}
                                    </button>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;

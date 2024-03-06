'use client'

/* Components */
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
/* Hooks */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';
import { useAuthContext } from '@/context/useAuthContext';

// COMPONENTE
/* Plantilla por Defecto */
export const DefaultLayout = ({ children }) => {
    /* Estado de Renderización del Lado del Cliente */
    const isClient = useIsClient();
    /* Navegación */
    const router = useRouter();
    /* Contexto de Autenticación */
    const { logged, logout } = useAuthContext();
    
    useEffect(() => {
        // CONDICIONAL
        /* Comprobación de Renderización del Lado del Cliente */
        if (isClient) {
            // CONDICIONAL
            /* Comprobación del Estado del Inicio de Sesión */
            if (!logged) {
                logout();
                router.push('/login');
            }
        }
    }, [ isClient ]);
    
    // CONDICIONAL
    /* Comprobación de Renderización del Lado del Cliente */
    if (!isClient) {
        // RETORNO
        return (
            <div className='h-screen flex items-center justify-center'>
                <div className='w-48 h-48 relative bg-gradient-to-r from-pink-700 via-pink-400 to-pink-100 rounded-full animate-spin'>
                    <div className='w-40 h-40 absolute top-1/2 left-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2'></div>
                </div>
            </div>
        );
    }

    // RETORNO
    return (<>
        <Navbar />

        <main>{ children }</main>

        <Footer />
    </>);
}

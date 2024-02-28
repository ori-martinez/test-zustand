/* Hooks */
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/useAuthContext';

// COMPONENTE
/* Barra de Navegación */
export const Navbar = () => {
    /* Navegación */
    const router = useRouter();
    /* Contexto de Autenticación */
    const { logged, session, logout } = useAuthContext();

    // FUNCIONES
    /* Funcionalidad de Logout */
    const onLogout = () => {
        logout();
        router.push('/login');
    }

    // RETORNO
    return (
        <nav className="px-10 py-4 w-full flex items-center justify-between bg-pink-600">
            <div className="font-semibold">Test Zustand {logged && (` - ${ session.name}`)}</div>
            
            {// CONDICIONAL
            /* Comprobación del Estado de la Autenticación */
            logged && (<button className="px-5 py-1 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full text-white font-semibold" onClick={() => onLogout()}>Logout</button>)}
        </nav>
    );
}

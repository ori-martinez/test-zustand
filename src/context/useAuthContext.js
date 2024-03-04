/* Cookies Next */
import Cookies from 'js-cookie'; 
/* Zustand */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// HOOK
/* Contexto de Autenticación */
export const useAuthContext = create(
    persist(
        (set) => ({
            logged: false,
            session: {},
            login: (user, token) => set(() => ({ logged: true, session: { user, token }, })),
            logout: () => set(() => ({ logged: false, session: {}, })),
        }),
        {
            storage: createJSONStorage(() => ({
                getItem: (key) => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value),
            })),
            name: 'context',
        },
    )
);

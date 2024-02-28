/* Zustand */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// HOOK
/* Contexto de Autenticación */
export const useAuthContext = create(
    persist(
        (set) => ({
            logged: false,
            session: {},
            token: '',
            login: (data, token) => set((state) => ({
                logged: true,
                session: data,
                token: token,
            })),
            logout:() => set((state) => ({
                logged: false,
                session: {},
                token: '',
            })),
        }),
        { name: 'auth-context' }
    )
);

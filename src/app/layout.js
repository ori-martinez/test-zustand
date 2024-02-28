/* Components */
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
/* Styles */
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
/* React Toastify */
import { ToastContainer } from 'react-toastify';

// CONSTANTES
/* Metadatos de la Página */
export const metadata = {
    title: 'Test Zustand',
    description: 'Testing Zustand',
}

// LAYOUT
/* Plantilla de la Raíz  */
const RootLayout = ({ children }) => (
    <html lang="en">
        <body>
            <DefaultLayout>
                { children }

                <ToastContainer />
            </DefaultLayout>
        </body>
    </html>
);

export default RootLayout;

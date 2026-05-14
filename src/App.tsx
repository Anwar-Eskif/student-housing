import { AuthProvider } from './providers/AuthProvider';
import AppRouter from './routes/AppRouter'
import { Toaster } from 'react-hot-toast';

const App = () => {

    return (
        <>
            <Toaster />
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </>
    )
}

export default App
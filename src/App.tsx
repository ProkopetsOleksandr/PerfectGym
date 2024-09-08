import { useTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './components/Authentication/Authentication';
import { useAuth } from './components/Common/Hooks/useAuth';
import RequireAuth from './components/Common/RequireAuth';
import ScreenLoader from './components/Common/ScreenLoader';
import Home from './components/Home/Home';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Workout from './components/Workout/Workout';
import { useAppSelector } from './core/redux/hook';

function App() {
    const { isInitialized, isLoading } = useAppSelector(store => store.application);
    const { isAuthenticated } = useAuth();
    const theme = useTheme();

    if (!isInitialized) {
        return (
            <ScreenLoader />
        );
    }

    if (!isAuthenticated) {
        return (<Authentication />);
    }

    return (
        <div id="app-wrapper">
            <div id="app-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/workout/*' element={<Workout />} />
                </Routes>
            </div>
            <div id="app-nav">
                <NavigationMenu />
            </div>

            {isLoading && <ScreenLoader />}
        </div>
    );
}

export default App;

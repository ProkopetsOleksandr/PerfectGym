import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Workout from './components/Workout/Workout';
import { useAppSelector } from './core/redux/hook';
import ScreenLoader from './components/Common/ScreenLoader';
import Login from './components/Login/Login';
import RequireAuth from './components/Common/RequireAuth';
import { useAuth } from './components/Common/Hooks/useAuth';

function App() {
    const { isInitialized, isLoading } = useAppSelector(store => store.application);
    const {isAuthenticated} = useAuth();

    if (!isInitialized) {
        return (
            <ScreenLoader />
        );
    }

    if (!isAuthenticated) {
        return (<Login />);
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

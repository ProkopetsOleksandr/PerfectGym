import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Workout from './components/Workout/Workout';

function App() {
    return (
        <BrowserRouter>
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
            </div>
        </BrowserRouter>
    );
}

export default App;

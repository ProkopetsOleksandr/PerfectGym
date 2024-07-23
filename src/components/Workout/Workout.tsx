import { NavLink, Route, Routes } from 'react-router-dom'
import Excercises from './Excercises/Excercises'
import Programs from './Programs/Programs'
import classes from './Workout.module.css'

const Workout = () => {
    return (
        <div>
            <div className={classes.workoutTabs}>
                <NavLink to="programs" className={({ isActive }) => isActive ? classes.active : ""}>Programs</NavLink>
                <NavLink to="excercises" className={({ isActive }) => isActive ? classes.active : ""}>Excercises</NavLink>
            </div>

            <div className={classes.workoutContent}>
                <div className="container">
                    <Routes>
                        <Route path='excercises' element={<Excercises />} />
                        <Route path='programs' element={<Programs />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default Workout;
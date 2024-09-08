import { styled } from '@mui/material/styles'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Excercises from './Excercises/Excercises'
import Programs from './Programs/Programs'
import classes from './Workout.module.css'

const Workout = () => {
    const StyledNavLink = styled(NavLink)(({ theme }) => ({
        '&::before': {
            backgroundColor: theme.palette.secondary.main
        },

        '&.active': {
            '&::before': {
                transform: 'translateX(-50%) scaleX(1)', // Показать эффект подчеркивания
            },
        }
    }));

    return (
        <div>
            <div className={classes.workoutTabs}>
                <StyledNavLink to="programs" className={classes.tab}>Programs</StyledNavLink>
                <StyledNavLink to="excercises" className={classes.tab}>Excercises</StyledNavLink>
            </div>

            <div className={classes.workoutContent}>
                <div className="container">
                    <Routes>
                        <Route index element={<Navigate to="excercises" replace />}></Route>
                        <Route path='programs' element={<Programs />} />
                        <Route path='excercises' element={<Excercises />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Workout;
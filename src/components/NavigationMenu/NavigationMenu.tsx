import AssessmentIcon from '@mui/icons-material/Assessment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import { styled, useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import classes from './NavigationMenu.module.css';

const NavigationMenu = () => {
    const style = useTheme();

    console.log(style.palette.secondary.main);

    const StyledNavLink = styled(NavLink)(({ theme }) => ({
        '&.active': {
            color: theme.palette.secondary.main, // Цвет текста для активной ссылки
        },
    }));

    return (
        <nav className={classes.nav}>
            <ul className={classes.navList}>
                <li className={classes.navItem}>
                    <StyledNavLink to="/" className={classes.navLink}>
                        <HomeIcon className={classes.homeIcon} />
                        <span className={classes.navName}>Home</span>
                    </StyledNavLink>
                </li>

                <li className={classes.navItem}>
                    <StyledNavLink to="/workout" className={classes.navLink}>
                        <FitnessCenterIcon className={classes.programsIcon} />
                        <span className={classes.navName}>Workout</span>
                    </StyledNavLink>
                </li>

                <li className={classes.navItem}>
                    <a href="#" className={classes.navLink}>
                        <HistoryIcon />
                        <span className={classes.navName}>History</span>
                    </a>
                </li>

                <li className={classes.navItem}>
                    <a href="#" className={classes.navLink}>
                        <AssessmentIcon />
                        <span className={classes.navName}>Stats</span>
                    </a>
                </li>

            </ul>
        </nav>
    );
}

export default NavigationMenu;
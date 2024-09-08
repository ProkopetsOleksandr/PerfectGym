import AssessmentIcon from '@mui/icons-material/Assessment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import classes from './NavigationMenu.module.css';

const NavigationMenu = () => {
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
                        <Typography variant='subtitle2'>Home</Typography>
                    </StyledNavLink>
                </li>

                <li className={classes.navItem}>
                    <StyledNavLink to="/workout" className={classes.navLink}>
                        <FitnessCenterIcon className={classes.programsIcon} />
                        <Typography variant='subtitle2'>Workout</Typography>
                    </StyledNavLink>
                </li>

                <li className={classes.navItem}>
                    <a href="#" className={classes.navLink}>
                        <HistoryIcon />
                        <Typography variant='subtitle2'>History</Typography>
                    </a>
                </li>

                <li className={classes.navItem}>
                    <a href="#" className={classes.navLink}>
                        <AssessmentIcon />
                        <Typography variant='subtitle2'>Stats</Typography>
                    </a>
                </li>

            </ul>
        </nav>
    );
}

export default NavigationMenu;
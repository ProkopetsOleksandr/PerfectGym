import AssessmentIcon from '@mui/icons-material/Assessment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import React from "react";
import { NavLink } from 'react-router-dom';
import classes from './NavigationMenu.module.css';

const NavigationMenu = () => {

    function GetNavLinkClassName({ isActive }: {isActive: boolean}) {
        let className = classes.navLink;
        if (isActive) {
            className += " " + classes.active
        }

        return className;
    }

    return (
        <div className={classes.navMenuContainer}>
            <nav className={classes.nav}>
                <ul className={classes.navList}>
                    <li className={classes.navItem}>
                        <NavLink to="/" className={GetNavLinkClassName}>
                            <HomeIcon className={classes.homeIcon} />
                            <span className={classes.navName}>Home</span>
                        </NavLink>
                    </li>

                    <li className={classes.navItem}>
                        <NavLink to="/workout" className={GetNavLinkClassName}>
                            <FitnessCenterIcon className={classes.programsIcon} />
                            <span className={classes.navName}>Workout</span>
                        </NavLink>
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
        </div>
    );
}

export default NavigationMenu;
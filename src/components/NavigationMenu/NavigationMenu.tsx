import React from "react";
import classes from './NavigationMenu.module.css';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AssessmentIcon from '@mui/icons-material/Assessment';

const NavigationMenu = () => {
    return (
        <div className={classes.navMenuContainer}>
            <nav className={`${classes.nav} container`}>
                <ul className={classes.navList}>
                    <li className={classes.navItem}>
                        <a href="#" className={classes.navLink}>
                            <HomeIcon/>
                            <span className={classes.navName}>Home</span>
                        </a>
                    </li>

                    <li className={classes.navItem}>
                        <a href="#" className={classes.navLink}>
                            <FitnessCenterIcon />
                            <span className={classes.navName}>Programs</span>
                        </a>
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
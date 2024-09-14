import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu } from '@mui/material';
import React from 'react';

interface MoreVertMenuProps {
    menuName: string,
    children: React.ReactNode[]
    sx?: object
}

const MoreVertMenu: React.FC<MoreVertMenuProps> = ({ menuName, children, sx }) => {
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(menuAnchorEl);

    console.log(menuName);

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setMenuAnchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton
                name={menuName}
                onClick={openMenu}
                size="small"
                aria-controls={menuOpen ? menuName : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                sx={{ color: 'primary.contrastText', ...sx }}
            >
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={menuAnchorEl}
                id={menuName}
                open={menuOpen}
                onClose={closeMenu}
                onClick={closeMenu}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {children}
            </Menu>
        </React.Fragment>
    )
}

export default MoreVertMenu;

import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface CarouselItemProps {
    children?: ReactNode;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
    return <Box style={{ minWidth: '100%', boxSizing: 'border-box', padding: '10px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {children}
    </Box>;
};

export default CarouselItem;
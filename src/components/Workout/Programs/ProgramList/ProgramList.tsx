import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { IProgram } from '../../../../core/models/workout';
import classes from './ProgramList.module.css';

interface ProgramListProps {
    programs: IProgram[],
    openProgram: (program: IProgram) => void
}

const ProgramList: React.FC<ProgramListProps> = ({ programs, openProgram }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    const ListItem = styled('li')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '15px',
        marginBottom: '10px',
        borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: theme.palette.background.paper
    }));

    if (!programs || !programs.length) {
        return (
            <div>No data</div>
        );
    }

    return (
        <ul>
            {programs.map(program =>
                <ListItem key={program.id} onClick={() => openProgram(program)}>
                    <img src={program.imageUrl ?? defaultImageUrl} style={{maxWidth: '70px'}} alt='excercise' />
                    <div>
                        <Typography variant='subtitle1' sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                            {program.title}
                        </Typography>
                        <Typography variant='caption'>
                            {program.description}
                        </Typography>
                    </div>
                </ListItem>
            )}
        </ul>
    )

}

export default ProgramList;

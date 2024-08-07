import React from 'react';
import { Program } from '../../../../core/models/workout';
import classes from './ProgramList.module.css';

interface ProgramListProps {
    programs: Program[],
    onProgramSelected: (program: Program) => void
}

const ProgramList: React.FC<ProgramListProps> = ({ programs, onProgramSelected }) => {
    return (
        <ul>
            {programs && programs.map(program => (
                <li key={program.id} className={classes.program} onClick={() => onProgramSelected(program)}>
                    <div className={classes.programInfo}>
                        <div className={classes.title}>{program.title}</div>
                        <div className={classes.description}>{program.description}</div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ProgramList;

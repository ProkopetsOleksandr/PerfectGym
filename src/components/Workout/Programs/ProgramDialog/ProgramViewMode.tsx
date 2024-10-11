import React from 'react';
import { IProgram } from '../../../../core/models/workout';

interface ProgramViewModeProps {
    selectedProgram: IProgram,
}

const ProgramViewMode: React.FC<ProgramViewModeProps> = ({ selectedProgram }) => {
    return (
        <div>
            <div>
                <div style={{ marginBottom: "2rem" }}>
                    <div>
                        <strong style={{ fontSize: "1.3rem" }}>{selectedProgram.title}</strong>
                    </div>
                    {selectedProgram.description &&
                        <div className="margin-top-1">
                            <div>{selectedProgram.description}</div>
                        </div>
                    }
                    <div className='margin-top-1'>
                        <strong>Created At:</strong> {selectedProgram.createdAt?.toDateString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramViewMode
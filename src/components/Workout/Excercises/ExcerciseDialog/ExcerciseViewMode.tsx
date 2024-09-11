import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { MeasurementCategoryLabel, MuscleGroupLabel } from '../../../../core/models/enums'
import { IExercise } from '../../../../core/models/workout'

interface ExcerciseViewModeProps {
    selectedExercise: IExercise,
    deleteExercise: () => void
}

const ExcerciseViewMode: React.FC<ExcerciseViewModeProps> = ({ selectedExercise, deleteExercise }) => {
    return (
        <div>
            {/* <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "1rem" }}>
                <IconButton onClick={() => setEditMode()}><Edit /></IconButton>
                <IconButton onClick={() => deleteExercise()}><Delete /></IconButton>
            </div> */}

            <div>
                <div style={{ marginBottom: "2rem" }}>
                    <strong style={{ fontSize: "1.3rem" }}>{selectedExercise.title}</strong>
                </div>

                <div className='margin-bottom-1'>
                    <strong>Myscle Group:</strong> {MuscleGroupLabel.get(selectedExercise.muscleGroup)}
                </div>

                <div className='margin-bottom-1'>
                    <strong>Category:</strong> {MeasurementCategoryLabel.get(selectedExercise.measurementCategory)}
                </div>

                {selectedExercise.description &&
                    <div className='margin-bottom-1'>
                        <div><strong>Description:</strong></div>
                        <div>{selectedExercise.description}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ExcerciseViewMode;
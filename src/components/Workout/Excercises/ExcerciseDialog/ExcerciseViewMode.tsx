import React from 'react'
import { Exercise, MeasurementCategoryLabel, MuscleGroupLabel } from '../../../../core/models/workout'
import { Button } from '@mui/material'

interface ExcerciseViewModeProps {
    selectedExercise: Exercise,
    setEditMode: () => void
}

const ExcerciseViewMode: React.FC<ExcerciseViewModeProps> = ({ selectedExercise, setEditMode }) => {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <strong style={{fontSize: "1.3rem"}}>{selectedExercise.title}</strong>
                </div>
                <Button variant='contained' style={{ background: "#272343" }} onClick={() => setEditMode()}>Edit</Button>
            </div>

            <div>
                {selectedExercise.description &&
                    <div className='margin-bottom-1'>
                        <div><strong>Description:</strong></div>
                        <div>{selectedExercise.description}</div>
                    </div>
                }

                <div className='margin-bottom-1'>
                    <strong>Myscle Group:</strong> {MuscleGroupLabel.get(selectedExercise.muscleGroup)}
                </div>

                <div className='margin-bottom-1'>
                    <strong>Category:</strong> {MeasurementCategoryLabel.get(selectedExercise.measurementCategory)}
                </div>
            </div>
        </div>
    )
}

export default ExcerciseViewMode;
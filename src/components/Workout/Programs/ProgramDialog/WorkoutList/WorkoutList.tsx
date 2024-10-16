import { closestCorners, DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../core/models/forms';
import WorkoutListItem from './WorkoutListItem';

interface ProgramDayExerciseListProps {
    workout: ITrainingProgramWorkoutFormModel[],
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void,
}

const WorkoutList: React.FC<ProgramDayExerciseListProps> = ({ workout, onDeleteExercise, onDeleteSuperset }) => {
    return (
        <DndContext collisionDetection={closestCorners}>
            <ul style={{ padding: '5px' }}>
                <SortableContext items={workout} strategy={verticalListSortingStrategy}>
                    {workout.map((currentWorkout, index) => {
                        return <WorkoutListItem currentWorkout={currentWorkout} key={currentWorkout.id} onDeleteExercise={onDeleteExercise} onDeleteSuperset={onDeleteSuperset} />
                    })}
                </SortableContext>
            </ul>
        </DndContext>
    )
}

export default WorkoutList;
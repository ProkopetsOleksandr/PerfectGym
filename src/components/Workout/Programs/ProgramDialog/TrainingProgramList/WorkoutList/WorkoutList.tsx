import { closestCorners, DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../../core/models/forms';
import WorkoutListItem from './WorkoutListItem';

interface ProgramDayExerciseListProps {
    workout: ITrainingProgramWorkoutFormModel[],
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void,
}

const WorkoutList: React.FC<ProgramDayExerciseListProps> = ({ workout, onDeleteExercise, onDeleteSuperset }) => {
    const sensors = useSensors(
        useSensor(TouchSensor, { activationConstraint: { distance: 10 } }),
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    );

    function onDragOver(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id === over.id) {
            return;
        }

        console.log(active);
        console.log(over);
    }

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={onDragOver} sensors={sensors}>
            <ul style={{ padding: '5px' }}>
                <SortableContext items={workout} strategy={verticalListSortingStrategy} >
                    {workout.map((currentWorkout) =>
                        <WorkoutListItem key={currentWorkout.id} currentWorkout={currentWorkout} onDeleteExercise={onDeleteExercise} onDeleteSuperset={onDeleteSuperset} />
                    )}
                </SortableContext>
            </ul>
        </DndContext>
    )
}

export default WorkoutList;
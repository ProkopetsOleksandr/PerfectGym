import { closestCorners, DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../core/models/forms';
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
        setIsDragging(false);

        const { active, over } = event;

        if (over && active.id === over.id) {
            return;
        }

        console.log(active);
        console.log(over);
    }

    const [isDragging, setIsDragging] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);

    const handleMouseDown = (e: any) => {

        console.log("mouse down")

        // Запускаем таймер на 2 секунды
        const timer = setTimeout(() => {
            setIsDragging(true);

            console.log("draggable")
        }, 1000);
        setTimeoutId(timer);
    };

    const handleMouseUp = () => {
        // Если отпустили до истечения времени, отменяем перетаскивание
        clearTimeout(timeoutId);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Обрабатываем случай ухода курсора
        >
            {isDragging ? (<DndContext collisionDetection={closestCorners} onDragEnd={onDragOver} sensors={sensors}>
                <ul style={{ padding: '5px' }}>
                    <SortableContext items={workout} strategy={verticalListSortingStrategy} >
                        {workout.map((currentWorkout) =>
                            <WorkoutListItem key={currentWorkout.id} currentWorkout={currentWorkout} onDeleteExercise={onDeleteExercise} onDeleteSuperset={onDeleteSuperset} />
                        )}
                    </SortableContext>
                </ul>
            </DndContext>) : (
                <ul style={{ padding: '5px' }}>
                    {workout.map((currentWorkout) =>
                        <WorkoutListItem key={currentWorkout.id} currentWorkout={currentWorkout} onDeleteExercise={onDeleteExercise} onDeleteSuperset={onDeleteSuperset} />
                    )}
                </ul>
            )}
        </div>

    )
}

export default WorkoutList;
import { closestCorners, DndContext, DragEndEvent, DragStartEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../../core/models/forms';
import useDeviceType from '../../../../../Common/Hooks/useDeviceType';
import WorkoutListItem from './WorkoutListItem';

interface WorkoutListProps {
    workout: ITrainingProgramWorkoutFormModel[],
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void,
    disableTrainingProgramChange: () => void,
    enableTrainingProgramChange: () => void
}

const WorkoutList = (props: WorkoutListProps) => {
    const { isTouchDevice } = useDeviceType();

    const sensorType = isTouchDevice ? TouchSensor : PointerSensor;
    const sensors = useSensors(useSensor(sensorType, { activationConstraint: { delay: 500, tolerance: 5 } }));

    const handleDragStart = (event: DragStartEvent) => {
        props.disableTrainingProgramChange();
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            // const oldIndex = todos.findIndex((item) => item.id === active.id);
            // const newIndex = todos.findIndex((item) => item.id === over.id);

            // setTodos(arrayMove(todos, oldIndex, newIndex));
        }

        props.enableTrainingProgramChange();
    };

    return (
        <DndContext collisionDetection={closestCorners}
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={props.workout} strategy={verticalListSortingStrategy} >
                {props.workout.map((currentWorkout) =>
                    <WorkoutListItem key={currentWorkout.id}
                        currentWorkout={currentWorkout}
                        onDeleteExercise={props.onDeleteExercise}
                        onDeleteSuperset={props.onDeleteSuperset} />
                )}
            </SortableContext>
        </DndContext>
    )
}

export default WorkoutList;
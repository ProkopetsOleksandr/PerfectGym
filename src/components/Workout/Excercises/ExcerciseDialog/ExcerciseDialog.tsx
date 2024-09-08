import { useState } from 'react';
import { IExercise } from '../../../../core/models/workout';
import { ApplicationAction } from '../../../../core/redux/application.slice';
import { ExerciseAction } from '../../../../core/redux/exercises.slice';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import AppDialog from '../../../Common/AppDialog/AppDialog';
import ExcerciseForm, { ExcerciseFormValues } from './ExcerciseForm';
import ExcerciseViewMode from './ExcerciseViewMode';

const ExcerciseDialog = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    
    const {isOpen, selectedExercise} = useAppSelector(store => store.exercises.exerciseDialog);

    const dispatch = useAppDispatch();

    function onSubmit(values: ExcerciseFormValues) {
        const excercise: IExercise = {
            id: selectedExercise?.id,
            title: values.title,
            description: values.description,
            muscleGroup: values.muscleGroup,
            measurementCategory: values.measurementCategory
        };

        dispatch(ApplicationAction.startLoading());

        if (selectedExercise) {
            dispatch(ExerciseAction.updateExcercise(excercise))
                .then(() => {
                    dispatch(ApplicationAction.endLoading());
                    setEditMode(false);
                });
        } else {
            dispatch(ExerciseAction.addExcercise(excercise))
                .then(() => {
                    dispatch(ApplicationAction.endLoading());
                    closeExerciseDialog();
                });
        }
    }

    function deleteExercise() {
        if (!selectedExercise) {
            return;
        }

        dispatch(ExerciseAction.deleteExercise(selectedExercise.id!));
        closeExerciseDialog();
    }
    
    function closeExerciseDialog() {
        setEditMode(false);

        if (!editMode || !selectedExercise) {
            dispatch(ExerciseAction.closeExerciseDialog());
        }
    }

    return (
        <AppDialog open={isOpen} onClose={closeExerciseDialog}>
            {selectedExercise && !editMode
                ? <ExcerciseViewMode selectedExercise={selectedExercise} setEditMode={() => setEditMode(true)} deleteExercise={deleteExercise} />
                : <ExcerciseForm selectedExercise={selectedExercise} onSubmit={onSubmit} /> }
        </AppDialog>
    )
}

export default ExcerciseDialog;
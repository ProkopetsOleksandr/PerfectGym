import { useState } from 'react';
import { IExercise } from '../../../../core/models/workout';
import { ApplicationAction } from '../../../../core/redux/application.slice';
import { ExerciseAction } from '../../../../core/redux/exercises.slice';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import AppDialog from '../../../Common/AppDialog/AppDialog';
import ExcerciseForm, { ExcerciseFormValues } from './ExcerciseForm';
import ExcerciseViewMode from './ExcerciseViewMode';

const ExcerciseDialog = () => {
    const { isOpen, selectedExercise, mode } = useAppSelector(store => store.exercises.exerciseDialog);

    const dispatch = useAppDispatch();

    function onSubmit(values: ExcerciseFormValues) {
        const excercise: IExercise = {
            id: selectedExercise?.id,
            title: values.title,
            description: values.description,
            muscleGroup: values.muscleGroup,
            measurementCategory: values.measurementCategory
        };

        // dispatch(ApplicationAction.startLoading());

        // if (selectedExercise) {
        //     dispatch(ExerciseAction.updateExcercise(excercise))
        //         .then(() => {
        //             dispatch(ApplicationAction.endLoading());
        //             setEditMode(false);
        //         });
        // } else {
        //     dispatch(ExerciseAction.addExcercise(excercise))
        //         .then(() => {
        //             dispatch(ApplicationAction.endLoading());
        //             closeExerciseDialog();
        //         });
        // }
    }

    function deleteExercise() {
        if (!selectedExercise) {
            return;
        }

        dispatch(ExerciseAction.deleteExercise(selectedExercise.id!));
        closeExerciseDialog();
    }

    function closeExerciseDialog() {
        if (mode === 'create' || mode === 'view') {
            dispatch(ExerciseAction.closeExerciseDialog());
            return;
        }

        switchExerciseDialogEditMode();
    }

    function switchExerciseDialogEditMode() {
        dispatch(ExerciseAction.switchExerciseDialogEditMode());
    }

    return (
        <AppDialog open={isOpen} onClose={closeExerciseDialog} title={mode === 'create' ? "Add exercise" : mode === 'edit' ? "Edit exercise" : ""}>
            {mode === 'view'
                ? <ExcerciseViewMode selectedExercise={selectedExercise!} setEditMode={switchExerciseDialogEditMode} deleteExercise={deleteExercise} />
                : <ExcerciseForm selectedExercise={selectedExercise} onSubmit={onSubmit} />}
        </AppDialog>
    )
}

export default ExcerciseDialog;
import { FC, useState } from 'react';
import { IExercise } from '../../../../core/models/workout';
import { ApplicationAction } from '../../../../core/redux/application.slice';
import { ExerciseAction } from '../../../../core/redux/exercises.slice';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import AppDialog from '../../../Common/AppDialog';
import ExcerciseForm, { ExcerciseFormValues } from './ExcerciseForm';
import ExcerciseViewMode from './ExcerciseViewMode';

interface ExcerciseDialogProps {
    selectedExerciseId?: number,
    open: boolean,
    handleClose: () => void
}

const ExcerciseDialog: FC<ExcerciseDialogProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    
    const selectedExercise = useAppSelector(store => store.exercises.selectedExercise);

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
                    closeDialog();
                });
        }
    }

    function deleteExercise() {
        if (!selectedExercise) {
            return;
        }

        dispatch(ExerciseAction.deleteExercise(selectedExercise.id!));
        closeDialog();
    }
    
    function closeDialog() {
        if (editMode && selectedExercise) {
            setEditMode(false);
            return;
        } 

        props.handleClose();
        dispatch(ExerciseAction.setSelectedExcercise(undefined));
        setEditMode(false);
    }

    return (
        <AppDialog open={props.open} onClose={closeDialog}>
            {selectedExercise && !editMode
                ? <ExcerciseViewMode selectedExercise={selectedExercise} setEditMode={() => setEditMode(true)} deleteExercise={deleteExercise} />
                : <ExcerciseForm selectedExercise={selectedExercise} onSubmit={onSubmit} /> }
        </AppDialog>
    )
}

export default ExcerciseDialog;
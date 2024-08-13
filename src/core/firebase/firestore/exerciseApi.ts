import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ExerciseViewModel } from "../../models/viewModels/workout";
import { auth, db } from "../firebase";

export default class ExerciseApi {
    static getAllExercisesAsync = async (): Promise<ExerciseViewModel[]> => {
        const exerciseCollectionRef = collection(db, `users/${auth.currentUser?.uid!}/exercises`);

        const querySnapshot = await getDocs(exerciseCollectionRef);

        const exercises = querySnapshot.docs.map(doc => {
            const data = doc.data();

            const exercise: ExerciseViewModel = {
                id: doc.id,
                title: data.title,
                description: data.descripion,
                muscleGroup: data.muscleGroup,
                measurementCategory: data.measurementCategory,
                imageUrl: data.imageUrl
            }

            return exercise;
        });

        return exercises;
    }

    static addExerciseAsync = async (exercise: ExerciseViewModel): Promise<string> => {
        console.log("Start")

        const { id, ...newExercise } = exercise;

        const exerciseCollectionRef = collection(db, `users/${auth.currentUser?.uid!}/exercises`);
        const result = await addDoc(exerciseCollectionRef, newExercise);

        return result.id;
    }

    static deleteExerciseAsync = async (exerciseId: string): Promise<void> => {
        const exerciseDocRef = doc(db, `users/${auth.currentUser?.uid!}/exercises/${exerciseId}`);
        await deleteDoc(exerciseDocRef);
    }
}
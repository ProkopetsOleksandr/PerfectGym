import { Box, Button, Chip, MenuItem, TextField } from '@mui/material';
import React, { useRef } from 'react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ITrainingProgramExerciseFormModel, ITrainingProgramFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../core/models/forms';
import MoreVertMenu from '../../../../Common/MoreVertMenu/MoreVertMenu';
import WorkoutList from './WorkoutList/WorkoutList';

interface TrainingProgramListProps {
    trainingPrograms: ITrainingProgramFormModel[],
    onTrainingProgramTitleChange: (trainingProgramId: number | string, value: string) => void,
    onAddExerciseButtonClick: () => void,
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void,
    onSelectedTrainingProgramChange: (index: number) => void
}

const TrainingProgramList: React.FC<TrainingProgramListProps> = (props) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    function changeAllowTouchMoveState(allow: boolean) {
        if (swiperRef.current) {
            swiperRef.current.allowTouchMove = allow;
        }
    }
    
    if (!props.trainingPrograms.length) {
        <div>No data</div>
    }

    return (
        <React.Fragment>
            <div id="swiper-pagination"></div>
            <Swiper
                slidesPerView={1}
                touchStartPreventDefault={false}
                modules={[Pagination]}
                pagination={{ clickable: true, el: "#swiper-pagination" }}
                style={{ height: '100%', maxWidth: '100%' }}
                onSwiper={(swiper: SwiperCore) => (swiperRef.current = swiper)}
                onActiveIndexChange={(swiper: SwiperCore) => props.onSelectedTrainingProgramChange(swiper.activeIndex)}
            >
                {props.trainingPrograms.map((trainingProgram, index) => {
                    return <SwiperSlide key={trainingProgram.id} style={{ height: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box className="margin-bottom-1" sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: 'space-between' }}>
                                <Chip label={`Day ${index + 1}`} color="secondary" sx={{ color: 'primary.contrastText' }} />

                                <TextField
                                    variant="standard"
                                    value={trainingProgram.title}
                                    onChange={(e) => props.onTrainingProgramTitleChange(trainingProgram.id, e.target.value)}
                                    size="small"
                                    fullWidth/>

                                <MoreVertMenu key={trainingProgram.id} menuName={'training-program-menu-' + trainingProgram.id} sx={{ color: 'primary.main' }}>
                                    <MenuItem>Change order</MenuItem>
                                    <MenuItem>Delete</MenuItem>
                                </MoreVertMenu>
                            </Box>

                            <Box sx={{ flex: '1 1 auto', overflowY: 'auto', padding: '10px', marginBottom: '10px' }}>
                                <WorkoutList workout={trainingProgram.workout}
                                    enableTrainingProgramChange={() => changeAllowTouchMoveState(true)}
                                    disableTrainingProgramChange={() => changeAllowTouchMoveState(false)}
                                    onDeleteExercise={props.onDeleteExercise}
                                    onDeleteSuperset={props.onDeleteSuperset} />
                            </Box>

                            <Box style={{ marginTop: 'auto', padding: '10px 10px 0 10px' }}>
                                <Button variant='contained' fullWidth onClick={props.onAddExerciseButtonClick}>Add exercise</Button>
                            </Box>
                        </Box>
                    </SwiperSlide>
                })}
            </Swiper>
        </React.Fragment>
    )
}

export default TrainingProgramList;
import { closestCorners, DndContext, DragEndEvent, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Button, Chip, MenuItem, TextField } from '@mui/material';
import React, { useRef } from 'react';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ITrainingProgramFormModel } from '../../../../../core/models/forms';
import useDeviceType from '../../../../Common/Hooks/useDeviceType';
import MoreVertMenu from '../../../../Common/MoreVertMenu/MoreVertMenu';
import WorkoutListItem from './WorkoutList/WorkoutListItem';

interface TrainingProgramListProps {
    trainingPrograms: ITrainingProgramFormModel[],
    onTrainingProgramTitleChange: (e: any, index: number) => void
}

const TrainingProgramList: React.FC<TrainingProgramListProps> = ({ trainingPrograms, onTrainingProgramTitleChange }) => {
    const isTouchDevice = useDeviceType();

    const swiperRef = useRef<SwiperCore | null>(null);
    const sensorType = isTouchDevice ? TouchSensor : PointerSensor;
    const sensors = useSensors(useSensor(sensorType, { activationConstraint: { delay: 500, tolerance: 5 } }));

    const handleDragStart = (event: DragStartEvent) => {
        console.log('Drag started', event);
        // Отключаем свайп при начале перетаскивания
        if (swiperRef.current) {
            swiperRef.current.allowTouchMove = false;
            console.log("swiperRef.current.allowTouchMove", swiperRef.current.allowTouchMove);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        console.log('Drag ended', event);

        const { active, over } = event;

        if (over && active.id !== over.id) {
            // const oldIndex = todos.findIndex((item) => item.id === active.id);
            // const newIndex = todos.findIndex((item) => item.id === over.id);

            // setTodos(arrayMove(todos, oldIndex, newIndex));
        }

        if (swiperRef.current) {
            swiperRef.current.allowTouchMove = true;
        }
    };

    return (
        <React.Fragment>
            {trainingPrograms.length &&
                <React.Fragment>
                    <div id="swiper-pagination"></div>
                    <Swiper
                        onSwiper={(swiper: SwiperCore) => (swiperRef.current = swiper)}
                        slidesPerView={1}
                        pagination={{ clickable: true, el: "#swiper-pagination" }}
                        modules={[Pagination]}
                        touchStartPreventDefault={false}
                        style={{ height: '100%', maxWidth: '100%' }}
                    >
                        {trainingPrograms.map((trainingProgram, index) => {
                            return <SwiperSlide key={index} style={{ height: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Box className="margin-bottom-1" sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: 'space-between' }}>
                                        <Chip label={`Day ${index + 1}`} color="secondary" sx={{ color: 'primary.contrastText' }} />

                                        <TextField
                                            variant="standard"
                                            value={trainingProgram.title}
                                            onChange={(e) => onTrainingProgramTitleChange(e, index)}
                                            size="small"
                                            fullWidth
                                        />

                                        <MoreVertMenu key={index} menuName={'training-program-menu-' + index} sx={{ color: 'primary.main' }}>
                                            <MenuItem>Change order</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                        </MoreVertMenu>
                                    </Box>

                                    <Box sx={{ flex: '1 1 auto', overflowY: 'auto', padding: '10px', marginBottom: '10px' }}>
                                        <DndContext collisionDetection={closestCorners} modifiers={[restrictToVerticalAxis]}
                                            sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                                            <SortableContext items={trainingProgram.workout} strategy={verticalListSortingStrategy} >
                                                {trainingProgram.workout.map((currentWorkout) =>
                                                    <WorkoutListItem key={currentWorkout.id} currentWorkout={currentWorkout} onDeleteExercise={onDeleteExercise} onDeleteSuperset={onDeleteSuperset} />
                                                )}
                                            </SortableContext>
                                        </DndContext>
                                    </Box>

                                    <Box style={{ marginTop: 'auto', padding: '10px 10px 0 10px' }}>
                                        <Button variant='contained' fullWidth onClick={() => onAddExerciseButtonClick(index)}>Add exercise</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default TrainingProgramList;
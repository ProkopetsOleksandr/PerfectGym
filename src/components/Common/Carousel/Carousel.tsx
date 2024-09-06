import React, { Children, ReactNode, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface CarouselProps {
    children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deltaX, setDeltaX] = useState(0); // Для отслеживания смещения во время свайпа
    const totalSlides = Children.count(children);

    const handleSwipe = (direction: 'LEFT' | 'RIGHT') => {
        if (direction === 'LEFT' && currentIndex < totalSlides - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (direction === 'RIGHT' && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
        setDeltaX(0); // Сброс смещения после завершения свайпа
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('LEFT'),
        onSwipedRight: () => handleSwipe('RIGHT'),
        onSwiping: (eventData) => {
            // Ограничение смещения на первом и последнем элементах
            if (
                (currentIndex === 0 && eventData.deltaX > 0) || // Влево на первом элементе
                (currentIndex === totalSlides - 1 && eventData.deltaX < 0) // Вправо на последнем элементе
            ) {
                setDeltaX(0); // Блокировка смещения
            } else {
                setDeltaX(eventData.deltaX); // Отслеживание смещения в реальном времени
            }
        },
        //preventDefaultTouchmoveEvent: true,
        trackMouse: true, // Опционально: поддержка свайпа мышью
    });

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* Индикаторы */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10px',
                }}
            >
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            margin: '0 5px',
                            backgroundColor: currentIndex === index ? '#000' : '#ddd',
                            transition: 'background-color 0.3s ease',
                        }}
                    />
                ))}
            </div>
            <div {...swipeHandlers} style={{ overflow: 'hidden', width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        transition: deltaX === 0 ? 'transform 0.3s ease-out' : 'none',
                        transform: `translateX(calc(-${currentIndex * 100}% + ${deltaX}px))`,
                    }}
                >
                    {Children.map(children, (child, index) => (
                        <div
                            key={index}
                            style={{
                                minWidth: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
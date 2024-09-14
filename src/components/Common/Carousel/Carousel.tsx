import React, { Children, ReactNode, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface CarouselProps {
    children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deltaX, setDeltaX] = useState(0);
    const totalSlides = Children.count(children);

    const handleSwipe = (direction: 'LEFT' | 'RIGHT') => {
        if (direction === 'LEFT' && currentIndex < totalSlides - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (direction === 'RIGHT' && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
        setDeltaX(0);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('LEFT'),
        onSwipedRight: () => handleSwipe('RIGHT'),
        onSwiping: (eventData) => {
            if (
                (currentIndex === 0 && eventData.deltaX > 0) ||
                (currentIndex === totalSlides - 1 && eventData.deltaX < 0)
            ) {
                setDeltaX(0);
            } else {
                setDeltaX(eventData.deltaX);
            }
        },
        trackMouse: true,
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
            <div
                {...swipeHandlers}
                style={{
                    overflow: 'hidden',
                    width: '100%',
                    background: '#fdfdfd',
                    borderRadius: '12px',
                }}
            >
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
                                padding: '10px', // Добавляем отступы к слайдам
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

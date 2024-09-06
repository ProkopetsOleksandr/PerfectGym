import React, { ReactNode } from 'react';

interface CarouselItemProps {
  children?: ReactNode;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default CarouselItem;
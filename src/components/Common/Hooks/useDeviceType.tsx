import { useEffect, useState } from 'react';

function useDeviceType() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const touchMediaQuery = window.matchMedia('(pointer: coarse)');
        setIsTouchDevice(touchMediaQuery.matches);

        const handleChange = () => setIsTouchDevice(touchMediaQuery.matches);
        touchMediaQuery.addListener(handleChange);

        return () => {
            touchMediaQuery.removeListener(handleChange);
        };
    }, []);

    return isTouchDevice;
}

export default useDeviceType;
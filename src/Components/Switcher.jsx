import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from '../Hook/useDarkSide';

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = checked => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };


    const defaultProperties = {
        dark: {
            circle: {
                r: 9,
            },
            mask: {
                cx: '50%',
                cy: '23%',
            },
            svg: {
                transform: 'rotate(40deg)',
            },
            lines: {
                opacity: 0,
            },
        },
        light: {
            circle: {
                r: 5,
            },
            mask: {
                cx: '100%',
                cy: '0%',
            },
            svg: {
                transform: 'rotate(90deg)',
            },
            lines: {
                opacity: 1,
            },
        },
        springConfig: { mass: 4, tension: 250, friction: 35 },
    };

    return (
        <>
            <div>
                <DarkModeSwitch sunColor="yellow" moonColor="white" animationProperties={defaultProperties} checked={darkSide} onChange={toggleDarkMode} size={50} />
            </div>
        </>
    );
}
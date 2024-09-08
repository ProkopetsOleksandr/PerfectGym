import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: 'rgb(39 35 67)', // основной цвет
            contrastText: '#fff'
        },
        secondary: {
            main: '#FF7043', // акцентный цвет
        },
        background: {
            default: '#F4F4F4', // цвет фона приложения
        },
        text: {
            primary: '#212121', // основной цвет текста
        },
    },
    typography: {
        button: {
            textTransform: 'none', // убирает заглавные буквы у кнопок
        },
    },
});

export default mainTheme;
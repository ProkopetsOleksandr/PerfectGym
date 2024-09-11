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
            paper: '#fdfdfd'
        },
        text: {
            primary: 'var(--mui-palette-primary-main)', // основной цвет текст
        },
        action: {
            active: "var(--mui-palette-primary-main)"
        }
    },
    typography: {
        button: {
            textTransform: 'none', // убирает заглавные буквы у кнопок
        },
    },
    components: {
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: '15px',
                    background: 'var(--mui-palette-background-default)'
                }
            }
        }
    }
});

export default mainTheme;
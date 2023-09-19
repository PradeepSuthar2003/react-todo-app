import { createTheme } from '@mui/material/styles';
import pog from './fonts/Poppins-Medium.ttf';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0f1f0f'
        },
        secondary: {
            main: '#fff',
        }
    },
    typography: {
        fontFamily: [
            pog,
        ]
    }
});
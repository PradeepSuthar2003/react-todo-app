import { createTheme } from '@mui/material/styles';
import pog from './fonts/Poppins-Medium.ttf';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000'
        },
    },
    typography: {
        fontFamily: [
            pog,
        ]
    }
});
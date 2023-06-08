import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography : {
        fontFamily: 'Nunito Sans'
    },
    palette: {
        primary: {
            main: '#212529'
        },
        secondary: {
            main: '#343a40'
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Nunito Sans'
                }
            }
        }
    }
});

export default theme;

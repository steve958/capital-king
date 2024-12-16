import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3' // blue
        },
        secondary: {
            main: '#fdd835' // yellow
        },
        background: {
            default: '#f5f5f5'
        },
        text: {
            primary: '#333333'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    borderRadius: '8px'
                }
            }
        }
    }
})

export default theme

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#2C86E6' // blue
        },
        secondary: {
            main: '#EF8E03' // yellow
        },
        background: {
            default: '#2CC0E6'
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

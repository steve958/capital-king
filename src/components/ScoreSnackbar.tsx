import React from 'react'
import { Snackbar, Alert } from '@mui/material'

interface ScoreSnackbarProps {
    open: boolean
    message: string
    onClose: () => void
}

const ScoreSnackbar: React.FC<ScoreSnackbarProps> = ({ open, message, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity="info" variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default ScoreSnackbar

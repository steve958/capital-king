import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

interface HeaderProps {
    title: string
    progress?: {
        current: number
        total: number
    }
}

const Header: React.FC<HeaderProps> = ({ title, progress }) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {progress && (
                    <Typography variant="body2">
                        {progress.current} / {progress.total}
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header

import React from 'react'
import { Slide } from '@mui/material'

interface TransitionWrapperProps {
    inProp: boolean
    children: React.ReactNode
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ inProp, children }) => {
    return (
        <Slide direction="left" in={inProp} mountOnEnter unmountOnExit timeout={1000}>
            <div>{children}</div>
        </Slide>
    )
}

export default TransitionWrapper

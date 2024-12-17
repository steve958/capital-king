import React from 'react'
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { getHighScores } from '../utilities/highScores'
import { useNavigate } from 'react-router-dom'

const HighScores: React.FC = () => {
    const navigate = useNavigate()
    const scores = getHighScores()

    return (
        <Container style={{ marginTop: '20px', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom textAlign='center'>
                High Scores
            </Typography>
            <List>
                {scores.map((s, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`Score: ${s.score}`} secondary={`Date: ${new Date(s.date).toLocaleString()}`} sx={{ margin: '5px' }} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={() => navigate('/')} sx={{ width: 'fit-content' }}>Back to Home</Button>
        </Container>
    )
}

export default HighScores

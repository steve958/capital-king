import React from 'react'
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { getHighScores } from '../utilities/highScores'
import { useNavigate } from 'react-router-dom'

const HighScores: React.FC = () => {
    const navigate = useNavigate()
    const scores = getHighScores()

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                High Scores
            </Typography>
            <List>
                {scores.map((s, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`Score: ${s.score}`} secondary={`Date: ${new Date(s.date).toLocaleString()}`} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={() => navigate('/')}>Back to Home</Button>
        </Container>
    )
}

export default HighScores

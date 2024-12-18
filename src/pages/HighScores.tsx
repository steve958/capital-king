// HighScores.tsx
import React, { useEffect, useState } from 'react'
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { getHighScores, HighScore } from '../utilities/highScores'
import { useNavigate } from 'react-router-dom'

const HighScores: React.FC = () => {
    const navigate = useNavigate();
    const [scores, setScores] = useState<HighScore[]>([]);

    useEffect(() => {
        (async () => {
            const fetchedScores = await getHighScores();
            setScores(fetchedScores);
        })();
    }, []);

    return (
        <Container style={{ marginTop: '20px', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom textAlign='center'>
                High Scores
            </Typography>
            <List>
                {scores.map((s, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`Score: ${s.score} - Player: ${s.playerId}`}
                            secondary={`Date: ${new Date(s.date).toLocaleString()}`}
                            sx={{ margin: '5px' }}
                        />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={() => navigate('/')} sx={{ width: 'fit-content', marginBottom: '15px' }}>Back to Home</Button>
        </Container>
    )
}

export default HighScores;

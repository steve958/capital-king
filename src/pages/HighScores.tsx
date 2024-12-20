import React, { useEffect, useState } from 'react'
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material'
import { getHighScores, HighScore } from '../utilities/highScores'
import { useNavigate } from 'react-router-dom'
import crown from '/king.svg'

const HighScores: React.FC = () => {
    const navigate = useNavigate();
    const [scores, setScores] = useState<HighScore[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const fetchedScores = await getHighScores();
            setScores(fetchedScores);
            setLoading(false);
        })();
    }, []);

    return (
        <Container style={{ marginTop: '20px', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom textAlign='center'>
                High Scores
            </Typography>
            {loading ? (
                <CircularProgress sx={{ margin: '20px' }} />
            ) : (
                <List>
                    {scores.map((s, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Score: ${s.score} - Player: ${s.playerId}`}
                                secondary={`Date: ${new Date(s.date).toLocaleString()}`}
                                sx={{ margin: '5px' }}
                            />
                            {s.score >= 197 && <img src={crown} className='left-crown' />}
                            {s.score >= 197 && <img src={crown} className='right-crown' />}
                        </ListItem>
                    ))}
                </List>
            )}
            {!loading && (
                <Button variant="contained" onClick={() => navigate('/')} sx={{ width: 'fit-content', marginBottom: '15px' }}>
                    Back to Home
                </Button>
            )}
        </Container>
    )
}

export default HighScores;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CountryCard from '../components/CountryCard'
import ScoreSnackbar from '../components/ScoreSnackbar'
import TransitionWrapper from '../components/TransitionWrapper'
import { useGameLogic } from '../hooks/useGameLogic'
import { useNavigate } from 'react-router-dom'
import { loadCountries } from '../utilities/dataLoader'
import { Container, Card, CardContent, Typography, Button } from '@mui/material'
import { updateHighScores } from '../utilities/highScores'

const Game: React.FC = () => {
    const navigate = useNavigate()
    const [countries, setCountries] = useState([])
    const [loaded, setLoaded] = useState(false)
    const {
        currentCountry,
        options,
        score,
        finished,
        winner,
        totalCountries,
        usedCountries,
        selectCapital
    } = useGameLogic(countries)

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [transitionIn, setTransitionIn] = useState(true)

    useEffect(() => {
        loadCountries().then((data: any) => {
            setCountries(data)
            setLoaded(true)
        })
    }, [])

    useEffect(() => {
        if (finished) {
            updateHighScores(score)
        }
    }, [finished, score])

    const handleCloseSnackbar = () => setSnackbarOpen(false)

    const handleSelect = (capital: string) => {
        selectCapital(capital)
        setSnackbarOpen(true)
        // After selection, new question will slide in
        setTransitionIn(false)
        setTimeout(() => setTransitionIn(true), 1100) // Wait for transitions
    }

    if (!loaded) {
        return <div>Loading...</div>
    }

    if (finished) {
        return (
            <Container style={{ marginTop: '40px' }}>
                <Card>
                    <CardContent>
                        {winner ? (
                            <Typography variant="h5">Winner! Perfect Score: {score}</Typography>
                        ) : (
                            <Typography variant="h5">Game Over! Your Score: {score}</Typography>
                        )}
                        <Button variant="contained" onClick={() => navigate('/')}>Back to Home</Button>
                    </CardContent>
                </Card>
            </Container>
        )
    }

    if (!currentCountry) {
        return <div>Loading question...</div>
    }

    return (
        <>
            <Header
                title="CapitalKing"
                progress={{ current: usedCountries.size, total: totalCountries }}
            />
            <TransitionWrapper inProp={transitionIn}>
                <CountryCard country={currentCountry.country_name} options={options} onSelect={handleSelect} />
            </TransitionWrapper>
            <ScoreSnackbar open={snackbarOpen} message={`Score: ${score}`} onClose={handleCloseSnackbar} />
        </>
    )
}

export default Game

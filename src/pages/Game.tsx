// Game.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CountryCard from "../components/CountryCard";
import ScoreSnackbar from "../components/ScoreSnackbar";
import TransitionWrapper from "../components/TransitionWrapper";
import { useGameLogic } from "../hooks/useGameLogic";
import { useNavigate } from "react-router-dom";
import { loadCountries } from "../utilities/dataLoader";
import { updateHighScores } from "../utilities/highScores";
import Countdown, { CountdownRendererFn } from "react-countdown";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Stack
} from "@mui/material";

const Game: React.FC = () => {
    const navigate = useNavigate();
    const countries = loadCountries();
    const [loaded, setLoaded] = useState(false);

    const {
        currentCountry,
        options,
        score,
        finished,
        winner,
        totalCountries,
        usedCountries,
        selectCapital,
        timeUp,
    } = useGameLogic(countries);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [transitionIn, setTransitionIn] = useState(true);
    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [countdownKey, setCountdownKey] = useState(0);

    // For player ID input
    const [playerId, setPlayerId] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [idError, setIdError] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    // Reset questionAnswered and start countdown on new country
    useEffect(() => {
        if (currentCountry && !finished) {
            setQuestionAnswered(false);
            setCountdownKey((prevKey) => prevKey + 1);
        }
    }, [currentCountry, finished]);

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    const handleSelect = (capital: string) => {
        setQuestionAnswered(true);
        selectCapital(capital);
        setSnackbarOpen(true);
        setTransitionIn(false);
        setTimeout(() => setTransitionIn(true), 1100);
    };

    // Custom renderer for the countdown
    const renderer: CountdownRendererFn = ({ seconds, completed }) => {
        if (completed) {
            return null;
        } else {
            return (
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "95px",
                        marginTop: "20px",
                        transition: "all 0.5s ease-in-out",
                        color: seconds <= 2 ? "red" : "#2C86E6",
                    }}
                >
                    {seconds}
                </div>
            );
        }
    };

    if (!loaded) {
        return <div>Loading...</div>;
    }

    if (finished) {
        // Once finished, we show a form to enter player ID if not submitted yet
        return (
            <Container style={{ marginTop: "40px" }}>
                <Card>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {winner ? (
                            <Typography variant="h5">
                                Winner! Perfect Score: {score}
                            </Typography>
                        ) : (
                            <Typography variant="h5">
                                Game Over! Your Score: {score}
                            </Typography>
                        )}

                        {!hasSubmitted ? (
                            <Stack spacing={2} sx={{ marginTop: '20px', width: '100%', maxWidth: '300px' }}>
                                <Typography variant="body1">
                                    Please enter a 5-character player ID:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    value={playerId}
                                    onChange={(e) => {
                                        setPlayerId(e.target.value.toUpperCase());
                                        if (e.target.value.length === 5) {
                                            setIdError(false);
                                        }
                                    }}
                                    error={idError}
                                    helperText={idError ? "Player ID must be exactly 5 characters" : ""}
                                    inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={async () => {
                                        if (playerId.length !== 5) {
                                            setIdError(true);
                                            return;
                                        }
                                        await updateHighScores(score, playerId);
                                        setHasSubmitted(true);
                                    }}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        ) : (
                            <Stack spacing={2} sx={{ marginTop: '20px' }}>
                                <Typography variant="body1">Thank you! Your score has been recorded.</Typography>
                                <Button variant="contained" onClick={() => navigate("/")}>
                                    Back to Home
                                </Button>
                            </Stack>
                        )}
                    </CardContent>
                </Card>
            </Container>
        );
    }

    if (!currentCountry) {
        return <div>Loading question...</div>;
    }

    return (
        <>
            <Header
                title="CapitalKing"
                progress={{ current: usedCountries.size, total: totalCountries }}
            />
            <TransitionWrapper inProp={transitionIn}>
                <CountryCard
                    country={currentCountry.country_name}
                    options={options}
                    onSelect={handleSelect}
                    flagUrl={currentCountry.flag}
                />
                {!questionAnswered && (
                    <Countdown
                        key={countdownKey}
                        date={Date.now() + 5000} // 5 seconds
                        renderer={renderer}
                        onComplete={() => {
                            timeUp();
                        }}
                    />
                )}
            </TransitionWrapper>

            <ScoreSnackbar
                open={snackbarOpen}
                message={`Score: ${score}`}
                onClose={handleCloseSnackbar}
            />
        </>
    );
};

export default Game;

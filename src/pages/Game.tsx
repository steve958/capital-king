import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CountryCard from "../components/CountryCard";
import ScoreSnackbar from "../components/ScoreSnackbar";
import TransitionWrapper from "../components/TransitionWrapper";
import { useGameLogic } from "../hooks/useGameLogic";
import { useNavigate } from "react-router-dom";
import { loadCountries } from "../utilities/dataLoader";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import { updateHighScores } from "../utilities/highScores";
import Countdown, { CountdownRendererFn } from "react-countdown";

const Game: React.FC = () => {
    const navigate = useNavigate();

    // Synchronous load of countries (no async needed)
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

    // Tracks if the user answered the current question
    const [questionAnswered, setQuestionAnswered] = useState(false);

    // Key to force re-render the countdown when a new question starts
    const [countdownKey, setCountdownKey] = useState(0);

    useEffect(() => {
        // Data is already available synchronously
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (finished) {
            updateHighScores(score);
        }
    }, [finished, score]);

    // Reset questionAnswered and start countdown when a new country loads (and game is not finished)
    useEffect(() => {
        if (currentCountry && !finished) {
            setQuestionAnswered(false);
            setCountdownKey((prevKey) => prevKey + 1);
        }
    }, [currentCountry, finished]);

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    const handleSelect = (capital: string) => {
        // Stop countdown by marking the question as answered
        setQuestionAnswered(true);
        selectCapital(capital);

        setSnackbarOpen(true);
        setTransitionIn(false);
        setTimeout(() => setTransitionIn(true), 1100);
    };

    if (!loaded) {
        return <div>Loading...</div>;
    }

    if (finished) {
        return (
            <Container style={{ marginTop: "40px" }}>
                <Card>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {winner ? (
                            <Typography variant="h5">
                                Winner! Perfect Score: {score}
                            </Typography>
                        ) : (
                            <Typography variant="h5">
                                Game Over! Your Score: {score}
                            </Typography>
                        )}
                        <Button variant="contained" onClick={() => navigate("/")} sx={{ width: 'fit-content' }} >
                            Back to Home
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    if (!currentCountry) {
        return <div>Loading question...</div>;
    }

    // Custom renderer for the countdown to style it
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
                            // When time runs out and user hasn't answered, timeUp()
                            timeUp();
                        }}
                    />
                )}
            </TransitionWrapper>

            {/* Only show countdown if the user hasn't answered yet */}

            <ScoreSnackbar
                open={snackbarOpen}
                message={`Score: ${score}`}
                onClose={handleCloseSnackbar}
            />
        </>
    );
};

export default Game;

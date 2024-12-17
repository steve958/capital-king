/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const [countries, setCountries] = useState([]);
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

    // Track whether the user answered the current question
    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [countdownKey, setCountdownKey] = useState(0);

    useEffect(() => {
        loadCountries().then((data: any) => {
            setCountries(data);
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (finished) {
            updateHighScores(score);
        }
    }, [finished, score]);

    // When a new question loads and the game isn't finished, reset questionAnswered and start countdown
    useEffect(() => {
        if (currentCountry && !finished) {
            setQuestionAnswered(false);
            setCountdownKey((prevKey) => prevKey + 1);
        }
    }, [currentCountry, finished]);

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    const handleSelect = (capital: string) => {
        // User selected an option, stop the countdown immediately
        setQuestionAnswered(true);
        selectCapital(capital);
        setSnackbarOpen(true);
        // After selection, new question will slide in
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
                    <CardContent>
                        {winner ? (
                            <Typography variant="h5">
                                Winner! Perfect Score: {score}
                            </Typography>
                        ) : (
                            <Typography variant="h5">
                                Game Over! Your Score: {score}
                            </Typography>
                        )}
                        <Button variant="contained" onClick={() => navigate("/")}>
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

    const renderer: CountdownRendererFn = ({ seconds, completed }) => {
        if (completed) {
            return null;
        } else {
            return (
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "48px",
                        marginTop: "20px",
                        transition: "all 0.5s ease-in-out",
                        color: seconds <= 2 ? "red" : "black",
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
                            // When countdown finishes without user response, timeUp()
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

import React, { useState } from "react";
import { Button, Container, Stack, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import crown from '../assets/crown.png'

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [closeAttempted, setCloseAttempted] = useState(false);

    const handleCloseGame = () => {
        window.open("", "_self");
        window.close();
        // If window.close() doesn't work, we show a message.
        setCloseAttempted(true);
    }

    return (
        <Container
            sx={{
                marginTop: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vw",
            }}
        >
            <Stack spacing={4} alignItems="center">
                <Typography variant="h4">Capital King</Typography>
                <img src={crown} alt="" />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/game")}
                >
                    Start Game
                </Button>
                <Button
                    sx={{ color: 'white' }}
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/high-scores")}
                >
                    High Scores
                </Button>
                <Button
                    sx={{ color: 'white' }}
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseGame}
                >
                    Close Game
                </Button>
                {closeAttempted && (
                    <Alert severity="info" sx={{ position: 'absolute' }}>
                        If the game did not close automatically, please close the browser tab manually.
                    </Alert>
                )}
            </Stack>
        </Container>
    );
};

export default Home;

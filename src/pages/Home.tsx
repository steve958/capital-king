import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import crown from '../assets/crown.png'

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container
            sx={{
                marginTop: "40px",
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
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/high-scores")}
                >
                    High Scores
                </Button>
            </Stack>
        </Container>
    );
};

export default Home;

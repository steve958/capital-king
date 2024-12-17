/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Country } from '../utilities/dataLoader'
import { shuffleArray } from '../utilities/shuffleArray'

interface GameState {
    currentCountry?: Country
    options: string[]
    score: number
    usedCountries: Set<string>
    finished: boolean
    winner: boolean
}

export function useGameLogic(countries: Country[]) {
    const [gameState, setGameState] = useState<GameState>({
        currentCountry: undefined,
        options: [],
        score: 0,
        usedCountries: new Set(),
        finished: false,
        winner: false
    })

    useEffect(() => {
        if (countries.length > 0 && !gameState.currentCountry && !gameState.finished) {
            nextQuestion()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countries])

    function nextQuestion() {
        const availableCountries = countries.filter(
            c => !gameState.usedCountries.has(c.country_name)
        );

        if (availableCountries.length === 0) {
            // All guessed correctly
            setGameState(prev => ({ ...prev, finished: true, winner: true }));
            return;
        }

        const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];

        // Attempt to get three distractors from the same continent
        const sameContinent = countries.filter(
            (c: any) => c.continent === randomCountry.continent && c.country_name !== randomCountry.country_name
        );

        let distractors: string[];
        if (sameContinent.length >= 3) {
            // We have enough from the same continent
            distractors = shuffleArray(sameContinent)
                .slice(0, 3)
                .map(c => c.capital_city);
        } else {
            // Not enough from the same continent
            // Use all from the same continent, then fill the rest from anywhere
            const needed = 3;
            const fromContinent = sameContinent.map(c => c.capital_city);
            const shortage = needed - fromContinent.length;

            // Pick random capitals from other countries, excluding the current one and those already chosen
            const others = countries.filter(c =>
                c.country_name !== randomCountry.country_name &&
                !fromContinent.includes(c.capital_city) // exclude already chosen distractors
            );

            const fallbackDistractors = shuffleArray(others)
                .slice(0, shortage)
                .map(c => c.capital_city);

            distractors = [...fromContinent, ...fallbackDistractors];
        }

        const options = shuffleArray([randomCountry.capital_city, ...distractors]);

        setGameState(prev => ({
            ...prev,
            currentCountry: randomCountry,
            options
        }));
    }

    function selectCapital(capital: string) {
        if (!gameState.currentCountry) return
        if (capital === gameState.currentCountry.capital_city) {
            // Correct
            const newUsed = new Set(gameState.usedCountries)
            newUsed.add(gameState.currentCountry.country_name)
            setGameState(prev => ({
                ...prev,
                score: prev.score + 1,
                usedCountries: newUsed
            }))
            setTimeout(() => nextQuestion(), 1000)
        } else {
            // Incorrect - Game Over
            setGameState(prev => ({ ...prev, finished: true }))
        }
    }

    function timeUp() {
        // Time is up and the user did not answer
        // End the game with no winner (if not already finished)
        setGameState(prev => ({ ...prev, finished: true, winner: false }))
    }

    return {
        ...gameState,
        totalCountries: countries.length,
        selectCapital,
        timeUp
    }
}

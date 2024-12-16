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
        )

        if (availableCountries.length === 0) {
            // All guessed correctly
            setGameState(prev => ({ ...prev, finished: true, winner: true }))
            return
        }

        const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)]
        const otherCountries = countries.filter(c => c.country_name !== randomCountry.country_name)
        const distractors = shuffleArray(otherCountries)
            .slice(0, 3)
            .map(c => c.capital_city)

        const options = shuffleArray([randomCountry.capital_city, ...distractors])

        setGameState(prev => ({
            ...prev,
            currentCountry: randomCountry,
            options,
            // score stays the same
        }))
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

    return {
        ...gameState,
        totalCountries: countries.length,
        selectCapital
    }
}

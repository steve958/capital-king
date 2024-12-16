interface HighScore {
    score: number
    date: string
}

const STORAGE_KEY = 'capitalking_highscores'

export function getHighScores(): HighScore[] {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data)
}

export function saveHighScores(scores: HighScore[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

export function updateHighScores(newScore: number) {
    const scores = getHighScores()

    // Add new score
    scores.push({ score: newScore, date: new Date().toISOString() })

    // Sort by score desc
    scores.sort((a, b) => b.score - a.score)

    // Keep top 10
    const top10 = scores.slice(0, 10)

    saveHighScores(top10)
}

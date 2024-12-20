// highScores.ts (Utilities)
import { db } from './firestoreConfig';
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';

export interface HighScore {
    score: number;
    date: string;
    playerId: string;
}

const scoresCollection = collection(db, 'scores');

/**
 * Retrieves the current top high scores, limited to the specified number.
 * @param limitNumber The number of top scores to retrieve.
 * @returns A promise that resolves to an array of HighScore objects.
 */
export async function getHighScores(limitNumber: number = 8): Promise<HighScore[]> {
    const q = query(scoresCollection, orderBy('score', 'desc'), limit(limitNumber));
    const snapshot = await getDocs(q);
    const scores: HighScore[] = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        scores.push({
            score: data.score,
            date: data.date,
            playerId: data.playerId
        });
    });
    return scores;
}

/**
 * Attempts to add a new high score to the database if it qualifies for the top scores.
 * @param newScore The player's score to be evaluated.
 * @param playerId The player's unique identifier.
 * @returns A promise that resolves to a boolean indicating whether the score was added.
 */
export async function attemptUpdateHighScores(newScore: number, playerId: string): Promise<boolean> {
    const topScores = await getHighScores();

    // If there are fewer than 8 scores, the new score automatically qualifies
    if (topScores.length < 8) {
        await addDoc(scoresCollection, {
            score: newScore,
            playerId,
            date: new Date().toISOString(),
            timestamp: serverTimestamp()
        });
        return true;
    }

    // Check if the new score is higher than the lowest score in the top 8
    const lowestTopScore = topScores[topScores.length - 1].score;
    if (newScore > lowestTopScore) {
        await addDoc(scoresCollection, {
            score: newScore,
            playerId,
            date: new Date().toISOString(),
            timestamp: serverTimestamp()
        });

        // Optional: Remove the lowest score to maintain only top 8
        // This requires identifying the specific document to delete
        // Implement this if your use case requires only top 8 to be stored
        // Note: Firestore doesn't support ordering queries with limit and deletion directly
        // Additional logic is needed to identify and delete the lowest score

        return true;
    }

    // Score does not qualify for top 8
    return false;
}

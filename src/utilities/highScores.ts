// highScores.tsx (Utilities)
import { db } from './firestoreConfig';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

export interface HighScore {
    score: number;
    date: string;
    playerId: string;
}

const scoresCollection = collection(db, 'scores');

export async function getHighScores(): Promise<HighScore[]> {
    const q = query(scoresCollection, orderBy('score', 'desc'), limit(8));
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

export async function updateHighScores(newScore: number, playerId: string) {
    await addDoc(scoresCollection, {
        score: newScore,
        playerId,
        date: new Date().toISOString(),
        timestamp: serverTimestamp()
    });
}

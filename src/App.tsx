import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './utilities/firestoreConfig'; // Adjust path as needed
import Home from './pages/Home';
import Game from './pages/Game';
import HighScores from './pages/HighScores';

const HARDCODED_EMAIL = 'stefanmiljevic958@gmail.com';
const HARDCODED_PASSWORD = 'stevenex';

const App: React.FC = () => {
  useEffect(() => {
    // Automatically sign in when the app loads
    signInWithEmailAndPassword(auth, HARDCODED_EMAIL, HARDCODED_PASSWORD)
      .then((userCredential) => {
        console.log('Signed in as:', userCredential.user.email);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/high-scores" element={<HighScores />} />
      </Routes>
    </Router>
  );
};

export default App;

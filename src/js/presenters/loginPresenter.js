import React, { useState } from 'react';
import { LoginView } from '../views/loginView';
import * as firebase from 'firebase/app';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom'; 
import app from '../firebaseConfig.js';

export function LoginPresenter({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [logIn, setLogIn] = useState(true);
    const [showResetPopup, setShowResetPopup] = useState(false);
    const auth = getAuth(app);
    const navigate = useNavigate();

    const location = useLocation();
  const fromPage = new URLSearchParams(location.search).get('redirect');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true); // Uppdatera inloggningsstatus
            navigate(fromPage ||'/');
        } catch (error) {
            setErrorText(error.message);
        }
    };

    const handleRegistration = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true); // Uppdatera inloggningsstatus
            navigate('/profile');
        } catch (error) {
            setErrorText(error.message);
        }
    };
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false); 
            navigate('/');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setErrorText("Vänligen ange en e-postadress.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setShowResetPopup(true);
            setTimeout(() => setShowResetPopup(false), 8000); // Stäng popup efter 20 sekunder
        } catch (error) {
            setErrorText("Kunde inte skicka återställningsmejl: " + error.message);
        }
    };

    const navigateHome = () => {
        navigate('/'); 
    };



    return (
        <LoginView
            signIn={logIn}
            login={() => setLogIn(true)}
            signUp={() => setLogIn(false)}
            onEmail={setEmail}
            onPassword={setPassword}
            errorText={errorText}
            onLogIn={handleLogin}
            onCreate={handleRegistration}
            onSignOut={handleSignOut}
            onForgotPassword={handleForgotPassword}
            showResetPopup={showResetPopup}
            closeResetPopup={() => setShowResetPopup(false)}
            onNavigateHome={navigateHome}
        />
    );
}

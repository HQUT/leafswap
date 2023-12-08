import React from 'react';
import { LoginView } from '../views/loginView.js';
import { useState } from 'react';

export function LoginPresenter(props) {
    // Använda state för att hantera användarinput
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Använda state för att växla mellan inloggning och skapande av konto
    const [logIn, setLogIn] = useState(true);

    return (
        <div>
            <LoginView
                signIn={logIn}
                login={() => setLogIn(true)}
                signUp={() => setLogIn(!logIn)}
                onEmail={(mail) => setEmail(mail)}
                onPassword={(paswrd) => setPassword(paswrd)}
            />
        </div>
    );
}

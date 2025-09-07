import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Login.module.css';

const Login = () => {
    const [loginUrl, setLoginUrl] = useState('');

    useEffect(() => {
        async function getUrl() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login/url`, {
                credentials: 'include',
            });
            setLoginUrl(await response.text());
        }
        getUrl();
    }, []);

    const LoginButton = () => {
        return (
            <a href={loginUrl}>
                <div id={styles.login_button}>
                    <p>Log in with </p>
                    <img src="../src/assets/SpotifyLogo.svg"/>
                </div>
            </a>
        );
    }

    return (
        <div className={styles.main}>
            <img src='../src/assets/Untitled.png' id={styles.timbre}/>
                <h1 id={styles.head}>TIMBRE - VIEW YOUR MUSIC</h1>
                <p id={styles.paragraph}>Just log into Timbre with your Spotify account and see your listening habits!</p>
                <LoginButton id={styles.fadesin}/>
        </div>
    );
}

export default Login;
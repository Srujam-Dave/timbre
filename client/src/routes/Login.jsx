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
                    <img src="../src/assets/SpotifyLogo.svg" id={styles.logo}/>
                </div>
            </a>
        );
    }

    return (
        <div className={styles.main}>
            <section id={styles.header}>
                <img src='../src/assets/Untitled.png' />
                <h1>TIMBRE - VIEW YOUR MUSIC</h1>
                <p>Celebrate your top artists and rediscover forgotten favorites.</p>
            </section>
            <div className={styles.content}>
                <section id={styles.top}>
                    <h1>COMPLETELY FREE</h1>
                    <p>Most sites hide important listening habits behind a paywall. 
                        Not here - view all your most important information at the click of a button. </p>
                    <p>Log in and start viewing!</p>
                </section>
                <section id={styles.bottom}>
                    <h1>SEAMLESSLY INTEGRATED</h1>
                    <p>Just log into Timbre with your Spotify account and see your listening habits!</p>
                    <LoginButton />
                </section>
            </div>
        </div>
    );
}

export default Login;
import { useState, useEffect, Fragment, useRef, CSSProperties } from 'react';
import { Navigate } from 'react-router-dom';
import styles from '../styles/Landing.module.css';


const Landing = () => {
    const [profile, setProfile] = useState({});
    const [timeframe, setTimeframe] = useState('');
    const [displayType, setDisplayType] = useState('');
    const [displayData, setDisplayData] = useState({
        tracks: [],
        artists: []
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function getProfile() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/me/profile`, {
                method: 'GET',
                credentials: 'include'
            });
            const profile = await res.json();
            setProfile(profile);
        }

        getProfile();
    }, []);

    const Header = () => {
        if (profile.error) {
            return (
                <Navigate replace to='/login' />
            );
        }

        return (
            <header>
                <h1> Hello, {profile.display_name} </h1>
            </header>
        );
    }

    useEffect(() => {        
        async function getData() {
            if (timeframe) {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/me/top?time_range=${timeframe}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const topItems = await res.json()
                setDisplayData(topItems);
                setLoading(false);
            }
        }

        getData();
    }, [timeframe]);

    const ScrollingText = ({text}) => {
        const textRef = useRef(null);
        const [isScrolling, setIsScrolling] = useState(false);
        const [scrollWidth, setScrollWidth] = useState(0);

        const spaceWidth = (() => {
            const el = document.createElement("span");
            el.innerText = " | ";
            el.style.visibility = "hidden";
            el.style.position = "absolute";
            el.style.whiteSpace = "pre";
            textRef.current?.appendChild(el);
            const width = el.getBoundingClientRect().width;
            textRef.current?.removeChild(el);
            return width;
        })();

        useEffect(() => {
            const setScrollAnimation = () => {
                // Measure on next frame to ensure layout is applied
                requestAnimationFrame(() => {
                    const el = textRef.current;
                    if (!el) return;

                    const textWidth = (() => {
                        const el = document.createElement("span");
                        el.innerText = text;
                        el.style.visibility = "hidden";
                        el.style.position = "absolute";
                        el.style.whiteSpace = "pre";
                        textRef.current?.appendChild(el);
                        const width = el.getBoundingClientRect().width;
                        textRef.current?.removeChild(el);
                        return width;
                    })();

                    setIsScrolling(el.clientWidth < textWidth);
                    setScrollWidth(textWidth);
                });
                console.log()
            }

            setScrollAnimation();

            window.addEventListener("resize", setScrollAnimation);

            return () => {
                window.removeEventListener("resize", setScrollAnimation);
            }
            
        }, [text]);

                    
        return (
            <p ref={textRef} style={{ '--textWidth': `${scrollWidth + spaceWidth}px` }} className={isScrolling ? styles.scrollAnimation : undefined}>
                    {text}{isScrolling ? " | " + text : ""}
            </p>
        );
    }

    const Artists = () => {
        if (!(displayType === 'artists')) {
            return null;
        }

        const artists = displayData.artists.items;

        return (
            <div id={styles.container}>
                {(displayType && !loading) &&
                    artists.map((entry, index) => {
                        return (
                            <a href={`spotify:artist:${entry.id}`} target="_blank"
                                key={entry.id} className={styles.card} style={{animationDelay: `${index * 0.1}s`}} >
                                    <img src={entry.images[0].url} />
                                    <div className={styles.cardText}>
                                        <p><strong>{index + 1}</strong></p>
                                        <div>
                                            <ScrollingText text={entry.name} />
                                            {/* <p className={styles.subtitle}>{entry.artists[0].name} <br /> {entry.album.name}</p> */}
                                        </div>
                                    </div>
                            </a>                    
                        );
                    })
                }
            </div>
        );
    }

    const Tracks = () => {
        if (!(displayType === 'tracks')) {
            return null;
        }

        const tracks = displayData.tracks.items;

        return (
            <div id={styles.container}>
                {(displayType && !loading) &&
                    tracks.map((entry, index) => {
                        return (
                            <a href={`spotify:track:${entry.id}`} 
                                key={entry.id} className={styles.card} style={{animationDelay: `${index * 0.1}s`}} target="_blank">
                                <img src={entry.album.images[0].url} />
                                <div className={styles.cardText}>
                                    <p><strong>{index + 1}</strong></p>
                                    <div>
                                        <ScrollingText text={entry.name} />
                                        <p className={styles.subtitle}>{entry.artists[0].name} <br /> {entry.album.name}</p>
                                    </div>
                                </div>
                            </a>
                        );
                    })
                }
            </div>
        );
     
    }

    const Dashboard = () => {
        return (
            <section id={styles.dash}>
                <div id={styles.selection}>
                    <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
                        <option value='' disabled>Select Timeframe</option>
                        <option value='short_term'>Last Four Weeks</option>
                        <option value='medium_term'>Last Six Months</option>
                        <option value='long_term'>Last Year</option>
                    </select>
                    <select value={displayType} onChange={e => setDisplayType(e.target.value)}>
                        <option value='' disabled>Select Data Type</option>
                        <option value='tracks'>Tracks</option>
                        <option value='artists'>Artists</option>
                    </select>
                </div>
                <Artists />
                <Tracks />
            </section>
        );
    }

    return (
        <Fragment>
            <Header />
            <Dashboard />
        </Fragment>
    );
}

export default Landing;
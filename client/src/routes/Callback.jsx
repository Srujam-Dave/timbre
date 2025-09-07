import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Callback = () => {
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    if (params["code"] == null) {
        return (
            <h1>Error recieving information</h1>
        );
    }

    useEffect(() => {
        const returnCode = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/login/code`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
        }

        returnCode();
    }, []);

    return (
        <>
            <h1>Successful Login</h1>
            <Navigate replace to='/landing' />
        </>
    );
}

export default Callback;
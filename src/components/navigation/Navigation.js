import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navigation() {
    const [auth, setAuth] = useContext(AuthContext);

    const hist = useHistory();

    function loggingOut() {
        setAuth(null);
        hist.push('/');
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            {auth ? (
                <>
                    | <Link to="/reservations">Reservations</Link> | <Link to="/adminmessages">inquries</Link> | <button onClick={loggingOut}>Log Out</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    )
}

export default Navigation

import React, { useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import login_icon from "../../images/icons/login_icon.png";
import holidaze from "../../images/icons/holidaze.png";
import openmenu from "../../images/icons/openmenu.png";
import menu from "../../images/icons/menu.png"


function Navigation() {
    const [auth, setAuth] = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const hist = useHistory();

    function loggingOut() {
        setAuth(null);
        hist.push('/');
    }

    return (
        <>
            <nav className="container__nav">
                <div onClick={() => setOpen(!open)} className="nav-icon">
                    {open ? <img alt="icon for menu open" src={openmenu} className="nav__mobile" /> : <img alt="icon for menu" src={menu} className="nav__closemenu" />}
                </div>
                <div className={open ? 'navigation__mobilemenu__open' : 'navigation__mobilemenu '}>


                    <div className="navigation">
                        <img src={holidaze} alt="Holidaze icon" className="navigation__img" /><Link className="navigation__links" onClick={() => setOpen(false)} to="/">Home</Link>
                        {auth ? (
                            <>
                                <Link className="navigation__links" to="/reservations" onClick={() => setOpen(false)}>Reservations</Link>
                                <Link className="navigation__links" to="/adminmessages" onClick={() => setOpen(false)}>inquries</Link>
                                <Link className="navigation__links" to="/publishhotels" onClick={() => setOpen(false)}>New hotel</Link>
                                <button className="navigation__links navigation__btn" onClick={() => { loggingOut(); setOpen(false) }}>Log Out</button>
                            </>
                        ) : (
                            <Link className="navigation__links" to="/login"><img className="navigation__loginimg" src={login_icon} />login</Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation

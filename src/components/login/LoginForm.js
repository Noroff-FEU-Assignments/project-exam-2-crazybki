import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { loginApi } from "../constants/ApiStrings"
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import login__img from "../../images/icons/login__img.jpg"

function LoginForm() {


    const [submit, setSubmit] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(null);


    const history = useHistory()

    const { register, handleSubmit, error } = useForm({

    });

    const [, setAuth] = useContext(AuthContext)

    async function onSubmit(data) {
        setSubmit(true);
        setErrorSubmit(null)

        console.log(data)

        try {
            const res = await axios.post(loginApi, data);
            setAuth(res.data)
            history.push("/reservations")
            console.log(res.data)
        } catch (error) {
            setErrorSubmit('error', error)
        } finally {
            setSubmit(false);
        }
    }

    return (
        <div className="loginform__containerform">
            <div className="loginform__imgcontainer">
                <img src={login__img} className="loginform__img" alt="img of hotel" />
            </div>
            <form className="loginform__screen" onSubmit={handleSubmit(onSubmit)}>
                <div className="loginform__background">
                    <label className="loginform__label">Username</label>
                    <div className="loginform__background">
                        <input type="text" className="loginform__input" {...register('identifier')} identifier="identfier" placeholder="username" />
                    </div>
                    <label className="loginform__label">password</label>
                    <div className="loginform__background">
                        <input type="password" className="loginform__input" {...register('password')} password="password" placeholder="password" />
                    </div>
                    <div className="loginform__background">
                        <button className="loginform__btn">Log in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { loginApi } from "../constants/ApiStrings"
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom"

function LoginForm() {


    const [submit, setSubmit] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(null);


    const history = useHistory()

    const { register, handleSubmit, error } = useForm({

    });

    const [auth, setAuth] = useContext(AuthContext)

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('identifier')} identifier="identfier" placeholder="username" />
                <input {...register('password')} password="password" placeholder="password" />
                <button>submit</button>
            </form>
        </div>
    )
}

export default LoginForm

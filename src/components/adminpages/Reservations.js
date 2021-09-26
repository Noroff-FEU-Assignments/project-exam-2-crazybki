import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DeleteButton from './buttons/DeleteButton';


function Reservations() {
    //JWT token taken from local storage
    let token = JSON.parse(localStorage.getItem('AuthKey')).jwt

    const [reservations, setRervations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function onCheckReservations() {
        window.location.reload()
    }

    useEffect(function () {

        async function getReservations() {
            try {
                const res = await axios.get('http://localhost:1337/hotel-reservations', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setRervations(res.data);

            }

            catch (error) {
                setError(error.toString());
                console.log(error)
            }

            finally {
                setLoading(false)
            }
        }
        getReservations();
    }, []);


    if (loading) {
        return <Spinner animation="grow" />;
    }

    if (error) {
        return <div>Error: an error occured</div>
    }


    return (
        <>
            <h1>Reservations</h1>
            <button onClick={onCheckReservations}>check for new messages</button>
            {reservations.map(resMsg => {
                console.log(resMsg)
                return <div key={resMsg.id}>
                    <h2>New reservation</h2>
                    <h3>{resMsg.hotelname}</h3>
                    <p key={resMsg.uppdated_at}>Name: {resMsg.firstName} {resMsg.lastName}</p>
                    <p key={resMsg.created_at}>Adress: {resMsg.adress} {resMsg.city}</p>
                    <p key={resMsg.mobilenumber}>Mobilenumber: {resMsg.mobilenumber}</p>
                    <p key={resMsg.to_date}>Booked from: {new Date(resMsg.from_date).toDateString()} To: {new Date(resMsg.to_date).toDateString()}</p>
                </div>
            })}
        </>
    )
}
export default Reservations
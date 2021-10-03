import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import ConfirmedBtn from './buttons/ConfirmedBtn';


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
                const res = await axios.get('https://aqueous-reef-33257.herokuapp.com/hotel-reservations', {
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
            <h1 className="reservation__heading">Reservations</h1>
            <div className="reservation__btncontainer">
                <button onClick={onCheckReservations}>check for new messages</button>
            </div>
            <p className="adminmessages__notification">{reservations.length > 0 && <span className="adminmessages__numbermsg">You have {reservations.length} new reservations</span>}</p>
            <div className="reservation__listcontainer">
                {reservations.map(resMsg => {
                    console.log('checkin is ' + resMsg.checkedin)
                    return <div className="reservation__info" key={resMsg.id}>
                        <h2 className="reservation__subheading">New reservation</h2>
                        <h3 className="reservation__hotelname">{resMsg.hotelname}</h3>
                        <p className="reservation__name" key={resMsg.uppdated_at}>Name: {resMsg.firstName} {resMsg.lastName}</p>
                        <p className="reservation__adress" key={resMsg.created_at}>Adress: {resMsg.adress} {resMsg.city}</p>
                        <p className="reservation__mobile" key={resMsg.mobilenumber}>Mobilenumber: {resMsg.mobilenumber}</p>
                        <p className="reservation__dates" key={resMsg.to_date}>Booked from: {new Date(resMsg.from_date).toDateString()} To: {new Date(resMsg.to_date).toDateString()}</p>
                        <p>{resMsg.checkedin}</p>
                        <ConfirmedBtn customerId={resMsg.id} customerCheckedIn={resMsg.checkedin} />

                    </div>
                })}
            </div>
        </>
    )
}
export default Reservations
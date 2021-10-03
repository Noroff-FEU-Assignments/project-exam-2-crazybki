import React, { useState } from 'react'
import axios from 'axios';

function ConfirmedBtn(props) {

    let customerConfirmed = props.customerCheckedIn

    const [customer, setCustomer] = useState(customerConfirmed)
    console.log(customer)

    let token = JSON.parse(localStorage.getItem('AuthKey')).jwt
    let customerId = props.customerId


    async function userIsConfirmed(id, confirmed) {
        const res = await axios.put(`https://aqueous-reef-33257.herokuapp.com/hotel-reservations/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            checkedin: confirmed
        });
        console.log(res)
    }

    function customerIsConfirmed() {
        setCustomer(false)
        userIsConfirmed(customerId, customer)
    }

    function customerIsNotConfirmed() {
        setCustomer(true)
        userIsConfirmed(customerId, customer)
    }
    return (
        <div>
            {customer ? (
                <button className="customerisconfirmed" onClick={customerIsConfirmed}>Booking confirmed</button>
            ) : (
                <button className="customerisnotconfirmed" onClick={customerIsNotConfirmed}>Confirm booking</button>
            )}
        </div>
    )
}

export default ConfirmedBtn


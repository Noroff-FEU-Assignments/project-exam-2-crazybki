import axios from 'axios'
import React from 'react'

function DeleteButton(props) {

    let token = JSON.parse(localStorage.getItem('AuthKey')).jwt

    async function sendDeleteReq(id) {
        const res = await axios.delete(`http://localhost:1337/messages/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    function handleClick(e) {
        console.log(props.idNumber)
        sendDeleteReq(props.idNumber);
        e.preventDefault();
    }

    return (
        <>
            <button className="adminmessages_delete" onClick={handleClick}>Delete message</button>
        </>
    )
}

export default DeleteButton

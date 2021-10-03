import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DeleteButton from './buttons/DeleteButton';



function AdminMessages() {

    //JWT token taken from local storage
    let token = JSON.parse(localStorage.getItem('AuthKey')).jwt

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function onRefresh(e) {
        e.preventDefault()
        window.location.reload();

    }

    useEffect(function () {

        async function getMessages() {
            try {
                const res = await axios.get('https://aqueous-reef-33257.herokuapp.com//messages', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setMessages(res.data);

            }

            catch (error) {
                setError(error.toString());
                console.log(error)
            }

            finally {
                setLoading(false)
            }
        }
        getMessages();
    }, []);

    if (loading) {
        return <Spinner animation="grow" />;
    }

    if (error) {
        return <div>Error: an error occured</div>
    }

    return (
        <>
            <h1 className="adminmessages_heading">Incoming messages</h1>
            <div className="adminmessages__btn">
                <button onClick={onRefresh} className="adminmessages__updatebtn">Fetch new messages</button>
            </div>
            <p className="adminmessages__notification">{messages.length > 0 && <span className="adminmessages__numbermsg">You have {messages.length} unread messages</span>}</p>
            <div className="flex">
                {messages.map(inquiriry => {
                    return <div key={inquiriry.updated_at}>
                        <div className="adminmessages_containter" key={inquiriry.id}>
                            <p className="adminmessages_date">Recieved at {new Date(inquiriry.created_at).toDateString()}</p>
                            <p className="adminmessages_from" key={inquiriry.emailadress}>From: {inquiriry.emailadress}</p>
                            <p className="adminmessages_name" key={inquiriry.firstName}>Name: {inquiriry.firstName} {inquiriry.lastName}</p>
                            <p className="adminmessages_hotel" key={inquiriry.hotelname}>Hotel: {inquiriry.hotelname}</p>
                            <p className="adminmessages_title" key={inquiriry.headline}>Title: {inquiriry.headline}</p>
                            <p className="adminmessages_title" key={inquiriry.published_at}>Message:</p>
                            <p className="adminmessages_message" key={inquiriry.message}>{inquiriry.message}</p>
                            <DeleteButton idNumber={inquiriry.id} key={inquiriry.created_at} />
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default AdminMessages

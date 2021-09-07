import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { hotelApi } from "../constants/ApiStrings"
import Messages from "../inqurieries/Messages";

function HotelDetails() {

    const [hotels, setHotels] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useHistory();

    const { id } = useParams();

    if (!id) {
        history.push()
    }

    const url = hotelApi + "/" + id;


    useEffect(
        function () {
            async function getData() {
                try {
                    const apiResponse = await fetch(url);


                    if (apiResponse.ok) {
                        const json = await apiResponse.json();
                        console.log(json)
                        setHotels(json)
                    } else {
                        setError('An error has occured');
                    }
                }

                catch (error) {
                    setError(error.toString());
                } finally {
                    setLoading(false)
                }
            }
            getData()
        }, [url]
    );

    if (loading) {
        return <div>Loading.....</div>
    }

    if (error) {
        return <div>An error occured</div>
    }



    return (
        <div>
            <h1>{hotels.Name}</h1>
            <p>{hotels.description}</p>
            <Messages name={hotels.Name} />
        </div>
    )
}

export default HotelDetails

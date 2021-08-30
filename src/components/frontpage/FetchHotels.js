import React from 'react';
import { useState, useEffect } from "react";
import { hotelApi } from "../constants/ApiStrings";

const localHost = "http://localhost:1337"

function FetchHotels() {
    const [apiData, setApiData] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function getData() {
            try {
                const res = await fetch(hotelApi)
                console.log(res)

                if (res.ok) {
                    const json = await res.json();
                    console.log(json);
                    setApiData(json);
                } else {
                    setError("An error occured");
                    console.log('error')
                }
            }

            catch (error) {
                setError(error.toString())
                console.log(error)
            }

            finally {
                setLoadData(false);
            }
        }
        getData();
    }, [])

    if (loadData) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>ERROR: An error occured</div>;
    }

    return (
        <div>
            {apiData.map(function (hotel) {
                return <div key={hotel.id}>
                    <p>Hotel {hotel.Name}</p>
                    <p>{hotel.Info}</p>
                    <img src={localHost + hotel.images.hotel_img[0].formats.small.url} alt="test" />
                </div>
            })}
        </div>
    )
};
export default FetchHotels

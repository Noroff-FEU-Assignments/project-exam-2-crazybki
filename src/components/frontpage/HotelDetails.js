import React from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { hotelApi } from "../constants/ApiStrings"
import Messages from "../inqurieries/Messages";
import { Spinner } from "react-bootstrap"
import OrderHotelForm from './OrderHotelForm';
import ImageSlider from './ImageSlider';
import InfoDetails from './InfoDetails';


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
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    if (error) {
        return <div>An error occured</div>
    }



    return (
        <>
            <ImageSlider images={hotels.img} />
            <div className="specific_descriptioncontainer">
                <h1 className="specific_hotelname">{hotels.Name}</h1>
                <p className="specific_info">{hotels.Info}</p>
            </div>

            <div className="specific_infodetails">
                <InfoDetails details={hotels.includes_whataround} />
            </div>
            <div>
                <Messages name={hotels.Name} />
            </div>
            <div>
                <OrderHotelForm hotelinfo={hotels.Name} />
            </div>
        </>
    )
}

export default HotelDetails


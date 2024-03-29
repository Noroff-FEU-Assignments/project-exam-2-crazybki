import React from 'react';
import { useParams, useHistory } from "react-router-dom";
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
            <div className="specific__pagecontainer">
                <ImageSlider images={hotels.img} />
                <div className="specific__container">
                    <div className="specific_descriptioncontainer">
                        <h1 className="specific_hotelname">{hotels.Name}</h1>
                        <p className="specific_info">{hotels.Info}</p>
                    </div>
                </div>
                <div className="specific_infodetails">
                    <InfoDetails
                        touristAttraction={hotels.around}
                        touristAttraction1={hotels.around1}
                        touristAttraction2={hotels.around2}
                        touristAttraction3={hotels.around3}
                        touristAttraction4={hotels.around4}

                        hotelInfo={hotels.includes}
                        hotelInfo1={hotels.includes1}
                        hotelInfo2={hotels.includes2}
                        hotelInfo3={hotels.includes3}
                        hotelInfo4={hotels.includes4}
                    />
                </div>
                <div>
                    <Messages />
                </div>
                <div className="specific_orderhotelform">
                    <p>Order right now</p>
                    <OrderHotelForm hotelinfo={hotels.Name} />
                </div>
            </div>
        </>
    )
}

export default HotelDetails


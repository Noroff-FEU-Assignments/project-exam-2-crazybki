import React from 'react';
import { useState, useEffect } from "react";
import { hotelApi } from "../constants/ApiStrings";
import SingleHotel from './SingleHotel';
import { Spinner } from "react-bootstrap";
import hero_front from "../../images/hero_front.jpg";
import bedandbreakfast from "../../images/icons/bedandbreakfast.png";
import hospits from "../../images/icons/hospits.png";
import hotels from "../../images/icons/hotels.png";



function FetchHotels() {
    const [apiData, setApiData] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(null);
    const [searchData, setSearchData] = useState('');



    function onSearch(e) {
        e.preventDefault()
        setSearchData(e.target.value)
    }


    useEffect(function () {
        async function getData() {
            try {
                const res = await fetch(hotelApi)


                if (res.ok) {
                    const json = await res.json();
                    setApiData(json);
                    console.log(json)

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
        return <Spinner animation="grow" />;
    }

    if (error) {
        return <div>ERROR: An error occured</div>;
    }

    const filteredHotels = apiData.filter(filteredHotel => {
        return filteredHotel.Name.toLowerCase().includes(searchData.toLocaleLowerCase())
    })


    return (
        <>
            <img
                src={hero_front}
                alt="image of fiskebryggen in bergen"
                className="frontpage_heroimg"
            />
            <div className="frontpage_search">
                <input className="frontpage_input" type="search" placeholder="search hotels, B&B or hospits" onChange={onSearch} />
            </div>

            <div className="frontpage_flexcontainerimg">
                <img
                    src={hotels}
                    alt="icons for hotels, click to search"
                    className="frontpage_icon"
                />

                <img
                    src={bedandbreakfast}
                    alt="icons for bead and breakfast, click to search"
                    className="frontpage_icon"
                />

                <img
                    src={hospits}
                    alt="icons for hospits, click to search"
                    className="frontpage_icon"
                />
            </div>
            <div className="backgroundimg">
                {filteredHotels.map(hotel => {
                    const { id, Name, description, img } = hotel
                    return <div className="frontpage_flexcontainer" key={hotel.id}>
                        <img className="frontpage_img" src={`https://aqueous-reef-33257.herokuapp.com${hotel.frontpageimage.url}`} alt={`image of hotelroom from ${hotel.Name}`} />
                        <div className="frontpage_descheading">
                            <h2 className="frontpage_headings">{hotel.Name}</h2>
                            <p className="frontpage_desc">{hotel.description}</p>
                        </div>
                        <SingleHotel key={id} id={id} name={Name} description={description} images={img} />
                    </div>
                })
                }
            </div>
        </>
    )

};

export default FetchHotels

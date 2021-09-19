import React from 'react';
import { useState, useEffect } from "react";
import { hotelApi } from "../constants/ApiStrings";
import SingleHotel from './SingleHotel';
import { Spinner } from "react-bootstrap";
import hero_front from "../../images/hero_front.jpg";
import bedandbreakfast from "../../images/icons/bedandbreakfast.jpg";
import hospits from "../../images/icons/hospits.jpg";
import hotels from "../../images/icons/hotels.jpg";
import bergen from "../../images/icons/bergen.jpg";


function FetchHotels() {
    const [apiData, setApiData] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(null);
    const [searchData, setSearchData] = useState('');
    const [filteredHospits, setHospits] = useState([]);


    function onSearch(e) {
        e.preventDefault()
        setSearchData(e.target.value)
    }

    function onFilteredHospits(e) {
        e.preventDefault()
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
        <div className="backgroundimg">
            <h1 className="heading__frontpage">Holidaze</h1>
            <img
                src={hero_front}
                alt="image of fiskebryggen in bergen"
                className="frontpage_heroimg"
            />
            <div className="frontpage_search">
                <input className="frontpage_input" type="search" placeholder="search hotels, B&B or hospits" onChange={onSearch} />
            </div>


            <h2 className="frontpage_icontxt">Click icons to filter</h2>
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
                    onClick={onFilteredHospits}
                />
            </div>

            {filteredHotels.map(hotel => {
                const { id, Name, description, img } = hotel
                return <div className="frontpage_flexcontainer" key={hotel.id}>
                    <img className="frontpage_img" src={`http://localhost:1337${hotel.frontpageimage.url}`} alt={`image of hotelroom from ${hotel.Name}`} />
                    <div className="frontpage_descheading">
                        <h2 className="frontpage_headings">{hotel.Name}</h2>
                        <p className="frontpage_desc">{hotel.description}</p>
                    </div>
                    <SingleHotel key={id} id={id} name={Name} description={description} images={img} />
                </div>
            })
            }
        </div>


    )

};

export default FetchHotels

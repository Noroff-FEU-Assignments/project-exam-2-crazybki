import React from 'react';
import { useState, useEffect } from "react";
import { hotelApi } from "../constants/ApiStrings";
import ImgSlider from './ImgSlider';
import SingleHotel from './SingleHotel';



function FetchHotels() {
    const [apiData, setApiData] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(null);
    const [searchData, setSearchData] = useState('');




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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>ERROR: An error occured</div>;
    }

    const filteredHotels = apiData.filter(filteredHotel => {
        return filteredHotel.Name.toLowerCase().includes(searchData.toLocaleLowerCase())
    })
    return (
        <div>
            <input type="search" placeholder="search" onChange={(e) => setSearchData(e.target.value)} ></input>

            {filteredHotels.map(hotel => {
                const { id, Name, description, img } = hotel
                return <div className="frontpage_flexcontainer" key={hotel.id}>
                    <h2>Hotel {hotel.Name}</h2>
                    <p>{hotel.description}</p>
                    <ImgSlider images={hotel.img} />
                    <div>
                        <SingleHotel key={id} id={id} name={Name} description={description} images={img} />
                    </div>
                </div>
            })}

        </div>
    )
};
export default FetchHotels

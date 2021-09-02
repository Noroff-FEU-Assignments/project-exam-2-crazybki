import React from 'react';
import { useState, useEffect } from "react";
import { hotelApi } from "../constants/ApiStrings";
import ImgSlider from './ImgSlider';
//import FrontPageSearchBar from './FrontPageSearchBar';



function FetchHotels() {
    const [apiData, setApiData] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(null);
    const [searchData, setSearchData] = useState('');
    const [filteredItems, setFilteredItems] = ([])


    useEffect(function () {
        async function getData() {
            try {
                const res = await fetch(hotelApi)


                if (res.ok) {
                    const json = await res.json();
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

    const filteredHotels = apiData.filter(filteredHotel => {
        return filteredHotel.Name.toLowerCase().includes(searchData.toLocaleLowerCase())
    })
    return (
        <div>
            <input type="search" placeholder="search" onChange={(e) => setSearchData(e.target.value)} ></input>

            {filteredHotels.map(hotel => {
                return <div className="frontpage_flexcontainer" key={hotel.id}>
                    <h2>Hotel {hotel.Name}</h2>
                    <p>{hotel.description}</p>
                    <ImgSlider images={hotel.img} />
                </div>
            })}

        </div>
    )
};
export default FetchHotels

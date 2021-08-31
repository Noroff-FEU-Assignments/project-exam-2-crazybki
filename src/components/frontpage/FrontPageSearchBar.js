import React from 'react'

function FrontPageSearchBar(props) {
    console.log(props.names)
    function searchHandler(e) {
        let userInput = e.event.target.value;
        let filteredItems = [];
    }
    return (
        <div>
            <input type="text" placeholder="search" onChange={searchHandler} />
            {props.names.filter(props === props.Name).map(filteredHotels => (
                <p>{filteredHotels}</p>
            ))}
        </div>
    )
}

export default FrontPageSearchBar

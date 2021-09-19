import React from 'react'

function InfoDetails(props) {
    let includes = props.details.includes
    let whatsAround = props.details.whatsaround

    return (
        <>
            <div className="specific_hoteldetails">
                <h2 className="specific_detailheading">This hotel includes</h2>
                {includes.map(function (hotelDetails) {
                    return <ul className="specific_list">
                        <li className="specific_list">{hotelDetails}</li>
                    </ul>
                })}
            </div>

            <div className="specific_hoteldetails">
                <h2 className="specific_detailheading">Near the hotel</h2>
                {whatsAround.map(function (cityInfo) {
                    return <ul className="specific_list">
                        <li className="specific_list">
                            {cityInfo}
                        </li>
                    </ul>
                })}
            </div>
        </>
    )
}

export default InfoDetails

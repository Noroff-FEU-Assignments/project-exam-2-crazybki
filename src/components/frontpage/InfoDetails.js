import React from 'react'

function InfoDetails(props) {

    console.log(props.touristAttraction)

    return (
        <>
            <div className="specific__includescontainer">
                <div className="specific_hoteldetails">
                    <ul className="specific_list">
                        <h2 className="specific_detailheading">This hotel includes</h2>
                        <li className="specific_list">{props.hotelInfo}</li>
                        <li className="specific_list">{props.hotelInfo1}</li>
                        <li className="specific_list">{props.hotelInfo2}</li>
                        <li className="specific_list">{props.hotelInfo3}</li>
                        <li className="specific_list">{props.hotelInfo4}</li>
                    </ul>
                </div>

                <div className="specific_nearhotel">
                    <h2 className="specific_detailheading">Near the hotel</h2>
                    <ul className="specific_list">
                        <li className="specific_list">{props.touristAttraction}</li>
                        <li className="specific_list">{props.touristAttraction1}</li>
                        <li className="specific_list">{props.touristAttraction2}</li>
                        <li className="specific_list">{props.touristAttraction3}</li>
                        <li className="specific_list">{props.touristAttraction4}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default InfoDetails

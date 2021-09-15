import React from 'react';
import { Link } from 'react-router-dom';

function SingleHotel({ id }) {

    return (
        <div className="frontpage_btn">
            <Link to={`hotels/${id}`}>
                <span className="color_btn">See more</span>
            </Link>
        </div>
    )
}

export default SingleHotel


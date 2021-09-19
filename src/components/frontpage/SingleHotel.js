import React from 'react';
import { Link } from 'react-router-dom';

function SingleHotel({ id }) {

    return (
        <div className="frontpage_btn">
            <Link style={{ textDecoration: 'none', color: 'white' }} to={`hotels/${id}`}>
                See more
            </Link>
        </div >
    )
}

export default SingleHotel


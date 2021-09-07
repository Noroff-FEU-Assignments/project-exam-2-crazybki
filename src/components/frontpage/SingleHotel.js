import React from 'react';
import { Link } from 'react-router-dom';

function SingleHotel({ id }) {

    return (
        <div>
            <Link to={`hotels/${id}`}>
                <p>See</p>
            </Link>
        </div>
    )
}

export default SingleHotel


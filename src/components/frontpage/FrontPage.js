import React from 'react';
import FetchHotels from './FetchHotels';
import Navigation from '../navigation/Navigation';

function FrontPage() {
    return (
        <div>
            <Navigation />
            <h1 className="heading__frontpage">Hotels in Bergen</h1>
            <FetchHotels />
        </div>
    )
}

export default FrontPage
